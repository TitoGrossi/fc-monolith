import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface<CheckStockInputDto, CheckStockOutputDto> {
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._repository.find(input.id.id);

        return {
            stock: product.stock
        };
    }
}