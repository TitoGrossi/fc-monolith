import Product from "../../domain/product.entity";
import AddProductUseCase from "./add-product.usecase";

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("add product use case unit tests", () => {
    it("should add a product", async () => {
        const productRepository = mockRepository();
        const input = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
        }

        const useCase = new AddProductUseCase(productRepository);
        const product = await useCase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(product.createdAt).toBeDefined();
        expect(product.updatedAt).toBeDefined();
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });
});