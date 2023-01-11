import SequelizeProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";

export default class ProductAdmFacadeFactory {
    static create(): ProductAdmFacade {
        const productRepository = new SequelizeProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: undefined,
        });

        return productFacade;
    }
}