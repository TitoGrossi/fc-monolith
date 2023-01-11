import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const mockRepo = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
    }
}

const mockCatalogFacade = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
    };
};

describe("GenerateInvoiceUseCase unit tests", () => {
    it("should create an invoice", async () => {
        const repo = mockRepo();
        const catalogFacade = mockCatalogFacade();
        for (const i of [1, 2, 3]) {
            catalogFacade.find.mockResolvedValueOnce({
                id: `${i}`,
                name: `product ${i}`,
                salesPrice: 10 * i
            });
        };
        const useCase = new GenerateInvoiceUseCase(repo, catalogFacade);

        const input = {
            name: "Invoice 1",
            document: "Document for invoice 1",
            street: "Street for invoice 1",
            number: "3",
            complement: "Complement for invoice 1",
            city: "City for invoice 1",
            state: "State for invoice 1",
            zipCode: "Zip Code for invoice 1",
            items: [
                { id: "1", name: "product 1", price: 10 },
                { id: "2", name: "product 2", price: 20 },
                { id: "3", name: "product 3", price: 30 },
            ],
        };

        const output = await useCase.execute(input);

        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
        output.items.forEach((item, idx) => {
            expect(item).toStrictEqual({
                id: input.items[idx].id,
                name: input.items[idx].name,
                price: input.items[idx].price,
            });
        });
        expect(output.total).toBe(60);

        expect(repo.create).toBeCalledWith(
            expect.objectContaining({
                _name: input.name,
                _document: input.document,
                _address: {
                    _street: input.street,
                    _number: input.number,
                    _complement: input.complement,
                    _city: input.city,
                    _state: input.state,
                    _zipCode: input.zipCode,
                },
                _items: [
                    expect.objectContaining({
                        _id: { _id: input.items[0].id },
                        _name: input.items[0].name,
                        _price: input.items[0].price,
                    }),
                    expect.objectContaining({
                        _id: { _id: input.items[1].id },
                        _name: input.items[1].name,
                        _price: input.items[1].price,
                    }),
                    expect.objectContaining({
                        _id: { _id: input.items[2].id },
                        _name: input.items[2].name,
                        _price: input.items[2].price,
                    }),
                ],
            })
        );
    })
})
