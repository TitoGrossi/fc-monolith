import { v4 as uuid } from "uuid";

import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("check stock use case unit tests", () => {
    it("should create a product", async () => {
        const product = new Product({
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 50,
            stock: 32,
        });
        const productRepository = mockRepository();
        productRepository.find.mockReturnValue(Promise.resolve(product));
        const input = {
            id: new Id(uuid())
        };

        const useCase = new CheckStockUseCase(productRepository);
        const result = await useCase.execute(input);

        expect(productRepository.find).toHaveBeenCalledTimes(1);
        expect(result.stock).toBe(product.stock);
    })
})