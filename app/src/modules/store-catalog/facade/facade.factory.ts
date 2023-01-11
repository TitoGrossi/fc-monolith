import SequelizeProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacade from "./store-catalog.facade";
import StoreCatalogFacadeInterface from "./store-catalog.facade.interface";

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacadeInterface {
        const productRepository = new SequelizeProductRepository();
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
        const findProductsUseCase = new FindProductUseCase(productRepository);
        const storeCatalogFacade = new StoreCatalogFacade({
            findAllProductsUseCase: findAllProductsUseCase,
            findProductUseCase: findProductsUseCase,
        });

        return storeCatalogFacade;
    }
};
