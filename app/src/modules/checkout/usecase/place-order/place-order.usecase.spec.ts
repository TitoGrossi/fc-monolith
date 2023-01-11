import { PlaceOrderInputDto } from "./place-order.dto"
import PlaceOrderUseCase from "./place-order.usecase"

const mockGateway = () => {
    return {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
    }
};

const mockClientFacade = () => {
    return {
        findClient: jest.fn(),
        addClient: jest.fn(),
    }
};

const mockProductFacade = () => {
    return {
        addProduct: jest.fn(),
        checkStock: jest.fn(),
    }
};

const mockCatalogFacade = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
    }
};

const mockPaymentFacade = () => {
    return {
        process: jest.fn(),
    }
}

const mockInvoiceFacade = () => {
    return {
        findInvoice: jest.fn(),
        generateInvoice: jest.fn(),
    }
}

describe("PlaceOrderUseCase unit tests", () => {
    describe("get products method", () => {
        const gateway = mockGateway()
        const clientService = mockClientFacade()
        clientService.findClient.mockReturnValue(true);
        const productService = mockProductFacade();
        const catalogService = mockCatalogFacade();
        const paymentService = mockPaymentFacade();
        const useCase = new PlaceOrderUseCase(
            gateway,
            clientService,
            productService,
            catalogService,
            paymentService,
            mockInvoiceFacade(),
        );

        afterEach(() => {
            gateway.addOrder.mockClear();
            gateway.findOrder.mockClear();
            clientService.addClient.mockClear();
            clientService.findClient.mockClear();
            productService.addProduct.mockClear();
            productService.checkStock.mockClear();
            catalogService.find.mockClear();
        });

        const mockDate = new Date(2000, 1, 1)
        beforeAll(() => {
            jest.useFakeTimers("modern");
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should throw an error when product not found", async () => {
            catalogService.find.mockResolvedValue(null);
            productService.checkStock.mockResolvedValue({ stock: 2 });

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [
                    {
                        productId: "1"
                    }
                ]
            };

            expect(useCase.execute(input)).rejects.toThrow(
                new Error("Product not found on catalog")
            )
        })

        it("should return a product when productService finds product", async () => {
            ;
            catalogService.find.mockResolvedValue({
                id: "0",
                name: "product0",
                description: "product0 description",
                salesPrice: 0,
            });
            productService.checkStock.mockResolvedValue({ stock: 2 });
            paymentService.process.mockResolvedValue({ status: "approved" })

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [
                    {
                        productId: "1"
                    }
                ]
            };

            const output = await useCase.execute(input);
            expect(output.products).toEqual([{
                productId: "0",
            }])
        })
    })

    describe("validate products method", () => {
        const gateway = mockGateway();
        const clientService = mockClientFacade();
        clientService.findClient.mockReturnValue(true);
        const productService = mockProductFacade();
        const catalogService = mockCatalogFacade();
        const useCase = new PlaceOrderUseCase(
            gateway,
            clientService,
            productService,
            catalogService,
            mockPaymentFacade(),
            mockInvoiceFacade(),
        )

        afterEach(() => {
            gateway.addOrder.mockClear();
            gateway.findOrder.mockClear();
            clientService.addClient.mockClear();
            clientService.findClient.mockClear();
            productService.addProduct.mockClear();
            productService.checkStock.mockClear();
            catalogService.find.mockClear();
            catalogService.findAll.mockClear();
        });

        it("should throw an error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [],
            }

            await expect(useCase.execute(input)).rejects.toThrow(new Error("No products selected"))
        })

        it("should throw an error when product is out of stock", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [{ productId: "1" }],
            }

            productService.checkStock.mockImplementation(({ productId }: { productId: string }) => {
                return Promise.resolve({
                    productId: productId,
                    stock: productId === "1" ? 0 : 1
                })
            })

            // expect(productService.checkStock).toHaveBeenCalledWith({ productId: input.products[0].productId })

            await expect(useCase.execute(input)).rejects.toThrow(new Error("Product 1 is out of stock"))
        })
    })

    describe("execute method", () => {
        it("should throw an error when client not found", async () => {
            const mockClientService = mockClientFacade();
            mockClientService.findClient.mockResolvedValue(null);
            const mockProductService = mockProductFacade();
            const catalogService = mockCatalogFacade();

            const useCase = new PlaceOrderUseCase(
                mockGateway(),
                mockClientService,
                mockProductService,
                catalogService,
                mockPaymentFacade(),
                mockInvoiceFacade(),
            );
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            };

            await expect(useCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            );

            expect(mockClientService.findClient).toBeCalledTimes(1);
            expect(mockClientService.findClient).toBeCalledWith({ id: input.clientId });
            expect(mockClientService.addClient).toBeCalledTimes(0);
        })

        it("should throw an error when products are not valid", async () => {
            const mockClientService = mockClientFacade();
            mockClientService.findClient.mockResolvedValue(true);
            const mockProductService = mockProductFacade();
            const catalogService = mockCatalogFacade();

            const useCase = new PlaceOrderUseCase(
                mockGateway(),
                mockClientService,
                mockProductService,
                catalogService,
                mockPaymentFacade(),
                mockInvoiceFacade(),
            );

            const mockValidateProducts = jest
                // @ts-expect-error - spy on private method
                .spyOn(useCase, "validateProducts")
                // @ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: []
            };

            await expect(useCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            );
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        })
    })

    describe("place an order", () => {
        const clientProps = {
            id: "1C",
            name: "client 0",
            document: "0",
            email: "client@personal.com",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };
        const clientService = mockClientFacade();
        clientService.findClient.mockResolvedValue(clientProps);

        const paymentService = mockPaymentFacade();
        const gateway = mockGateway();
        const productService = mockProductFacade();
        const catalogService = mockCatalogFacade();

        const invoiceService = mockInvoiceFacade();
        invoiceService.generateInvoice.mockResolvedValue({ id: "1i" });

        const useCase = new PlaceOrderUseCase(
            mockGateway(),
            clientService,
            productService,
            catalogService,
            paymentService,
            invoiceService,
        )

        afterEach(() => {
            gateway.addOrder.mockClear();
            gateway.findOrder.mockClear();
            clientService.addClient.mockClear();
            clientService.findClient.mockClear();
            invoiceService.findInvoice.mockClear();
            invoiceService.generateInvoice.mockClear();
            paymentService.process.mockClear();
            productService.checkStock.mockClear();
        })

        it("should not be approved", async () => {
            productService.checkStock.mockResolvedValue({ stock: 2 });
            catalogService.find.mockResolvedValue({
                id: "1",
                name: "name",
                description: "description",
                salesPrice: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            paymentService.process.mockReturnValueOnce({
                transactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "error",
            });

            const input: PlaceOrderInputDto = {
                clientId: clientProps.id,
                products: [
                    {
                        productId: "1"
                    }
                ]
            }

            const output = await useCase.execute(input);

            expect(output.invoiceId).toBeNull();
            expect(output.total).toBe(5);
            expect(output.products).toStrictEqual([
                { productId: "1", }
            ])
            expect(paymentService.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total,
            })
            expect(invoiceService.generateInvoice).toHaveBeenCalledTimes(0);
            // expect(gateway.addOrder).toHaveBeenCalledWith({}) -> object containing
        })

        it("should be approved", async () => {
            productService.checkStock.mockResolvedValue({ stock: 2 });
            catalogService.find.mockResolvedValue({
                id: "1",
                name: "name",
                description: "description",
                salesPrice: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            paymentService.process.mockReturnValueOnce({
                transactionId: "1t",
                orderId: "1o",
                amount: 100,
                status: "approved",
            });

            const input: PlaceOrderInputDto = {
                clientId: clientProps.id,
                products: [
                    {
                        productId: "1"
                    }
                ]
            }

            const output = await useCase.execute(input);

            expect(output.invoiceId).toBe("1i");
            expect(output.total).toBe(5);
            expect(output.products).toStrictEqual([
                { productId: "1", }
            ])
            expect(paymentService.process).toHaveBeenCalledWith({
                orderId: output.id,
                amount: output.total,
            })
            expect(invoiceService.generateInvoice).toHaveBeenCalledTimes(1);
            // expect(gateway.addOrder).toHaveBeenCalledWith({}) -> object containing
        })
    })
})
