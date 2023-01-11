import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 20,
})

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 10,
})

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
    };
};


describe("find all products use case unit tests", () => {
    it("should find all products", async () => {
        const productRepo = mockRepository();
        const useCase = new FindAllProductsUseCase(productRepo);

        const result = await useCase.execute();

        expect(productRepo.findAll).toHaveBeenCalledTimes(1);
        expect(result.length).toBe(2);

        expect(result[0].id).toBe(product1.id.id);
        expect(result[0].name).toBe(product1.name);
        expect(result[0].description).toBe(product1.description);
        expect(result[0].salesPrice).toBe(product1.salesPrice);

        expect(result[1].id).toBe(product2.id.id);
        expect(result[1].name).toBe(product2.name);
        expect(result[1].description).toBe(product2.description);
        expect(result[1].salesPrice).toBe(product2.salesPrice);
    })
})
