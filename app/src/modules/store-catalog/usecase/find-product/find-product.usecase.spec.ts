import Product from "../../domain/product.entity"
import FindProductUseCase from "./find-product.usecase"

const product = new Product({
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 10,
})

const mockRepo = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("FindProductUseCase tests", () => {
    it("should find a product", async () => {
        const productRepo = mockRepo();
        const useCase = new FindProductUseCase(productRepo)

        useCase.execute({ id: product.id.id })

        expect(productRepo.find).toHaveBeenCalled()
    })
})
