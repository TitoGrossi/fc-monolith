import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { FindAllProductDto } from "../usecase/find-all-products/find-all-products.dto";
import { FindProductInputDto, FindProductOutputDto } from "../usecase/find-product/find-product.dto";
import StoreCatalogFacadeInterface, { FindCatalogFacadeInputDto, FindCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findProductUseCase: UseCaseInterface<FindProductInputDto, FindProductOutputDto>;
    findAllProductsUseCase: UseCaseInterface<void, FindAllProductDto>;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findProductUseCase: UseCaseInterface<FindProductInputDto, FindProductOutputDto>;
    private _findAllProductsUseCase: UseCaseInterface<void, FindAllProductDto>;

    constructor(useCases: UseCaseProps) {
        this._findProductUseCase = useCases.findProductUseCase;
        this._findAllProductsUseCase = useCases.findAllProductsUseCase;
    }

    async findAll(): Promise<FindCatalogFacadeInputDto[]> {
        return this._findAllProductsUseCase.execute();
    }

    async find(input: FindCatalogFacadeInputDto): Promise<FindCatalogFacadeOutputDto> {
        return this._findProductUseCase.execute({ id: input.id });
    }
}
