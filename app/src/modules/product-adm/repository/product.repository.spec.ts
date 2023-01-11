import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

import Product from "../domain/product.entity";
import { ProductModel } from "./product.model";
import SequelizeProductRepository from "./product.repository";

describe("ProductRepository test", () => {
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
        const product = new Product({
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        })
        const productRepository = new SequelizeProductRepository();

        await productRepository.add(product);

        const productDb = await ProductModel.findOne(({ where: { id: product.id.id } }));

        expect(productDb.id).toBe(product.id.id);
        expect(productDb.name).toBe(product.name);
        expect(productDb.description).toBe(product.description);
        expect(productDb.purchasePrice).toBe(product.purchasePrice);
        expect(productDb.stock).toBe(product.stock);
    });

    it("should find a repository based on its id", async () => {
        const oneId = uuid();
        const createdProduct = await ProductModel.create({
            id: oneId,
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const productRepository = new SequelizeProductRepository();

        const product = await productRepository.find(oneId)

        expect(product.id.id).toBe(oneId);
        expect(product.name).toBe(createdProduct.name);
        expect(product.description).toBe(createdProduct.description);
        expect(product.purchasePrice).toBe(createdProduct.purchasePrice);
        expect(product.stock).toBe(createdProduct.stock);
        expect(product.createdAt).not.toBeNull();
        expect(product.updatedAt).not.toBeNull();
    })
});
