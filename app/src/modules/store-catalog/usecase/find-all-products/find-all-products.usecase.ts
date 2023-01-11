import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface<void, FindAllProductDto> {
    private _productRepository: ProductGateway

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }

    async execute(): Promise<FindAllProductDto> {
        const products = await this._productRepository.findAll();
        return products.map((product) => {
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }
        })
    }
}
