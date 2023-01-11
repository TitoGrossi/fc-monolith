import Id from "../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductInputDto, AddProductOutputDto } from "../usecase/add-product/add-product.dto";
import { CheckStockInputDto, CheckStockOutputDto } from "../usecase/check-stock/check-stock.dto";
import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFacadeInputDto,
    CheckStockFacadeOutputDto,

} from "./product-adm.facade.interface";


export interface UseCaseProps {
    addUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    stockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
    private _checkStockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;

    constructor(useCases: UseCaseProps) {
        this._addUseCase = useCases.addUseCase;
        this._checkStockUseCase = useCases.stockUseCase
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUseCase.execute({
            id: new Id(input.productId)
        })
    }
}
