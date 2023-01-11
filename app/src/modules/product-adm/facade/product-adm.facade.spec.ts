import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

import Id from "../../@shared/domain/value-object/id.value-object";
import { ProductModel } from "../repository/product.model";
import SequelizeProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import ProductAdmFacade from "./product-adm.facade";

describe("ProductAdmFacade tests", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new SequelizeProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: undefined,
        });

        const input = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 50,
            stock: 5,
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({
            where: {
                name: input.name,
                description: input.description,
                purchasePrice: input.purchasePrice,
                stock: input.stock,
            }
        });

        expect(product).toBeDefined();
        expect(product.name).toEqual(input.name);
        expect(product.description).toEqual(input.description);
        expect(product.purchasePrice).toEqual(input.purchasePrice);
        expect(product.stock).toEqual(input.stock);
    })

    it("should check the stock", async () => {
        const oneId = uuid()
        ProductModel.create({
            id: oneId,
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const productRepository = new SequelizeProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: checkStockUseCase,
        });

        const id = new Id(oneId)

        const input = {
            productId: id.id
        };

        const result = await productFacade.checkStock(input);

        expect(result.stock).toBe(10);
    })
})
