import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import SequelizeProductRepository from "./product.repository";

describe("ProductRepository tests", () => {
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

    it("should find all products", async () => {
        [1, 2].forEach(async num => {
            await ProductModel.create({
                id: `${num}`,
                name: `Product ${num}`,
                description: `Product ${num} description`,
                salesPrice: 100 * num,
            });
        })

        const productRepo = new SequelizeProductRepository();
        const products = await productRepo.findAll();

        expect(products.length).toBe(2);

        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Product 1 description");
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Product 2 description");
        expect(products[1].salesPrice).toBe(200);
    })

    it("should find a product", async () => {
        const savedProduct = await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const productRepo = new SequelizeProductRepository();
        const retrievedProduct = await productRepo.find(savedProduct.id);

        expect(retrievedProduct.id.id).toBe(savedProduct.id);
        expect(retrievedProduct.name).toBe(savedProduct.name);
        expect(retrievedProduct.description).toBe(savedProduct.description);
        expect(retrievedProduct.salesPrice).toBe(savedProduct.salesPrice);
    })
})