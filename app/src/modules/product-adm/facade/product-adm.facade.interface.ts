export interface AddProductFacadeInputDto {
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto {
    productId: string
}

export interface CheckStockFacadeOutputDto {
    stock: number;
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
};
