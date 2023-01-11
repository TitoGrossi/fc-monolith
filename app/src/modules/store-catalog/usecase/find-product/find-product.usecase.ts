import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface<FindProductInputDto, FindProductOutputDto> {
    private _productsRepo: ProductGateway

    constructor(repo: ProductGateway) {
        this._productsRepo = repo;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this._productsRepo.find(input.id)
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }
}