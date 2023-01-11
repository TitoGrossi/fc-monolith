export interface FindCatalogFacadeInputDto {
    id: string;
}

export interface FindCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export default interface StoreCatalogFacadeInterface {
    findAll(): Promise<FindCatalogFacadeInputDto[]>;
    find(id: FindCatalogFacadeInputDto): Promise<FindCatalogFacadeOutputDto>;
}