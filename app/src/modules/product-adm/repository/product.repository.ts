import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class SequelizeProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        })
    }

    async find(id: string): Promise<Product> {
        const retrievedProduct = await ProductModel.findOne({ where: { id: id } })

        if (!retrievedProduct)
            throw new Error(`Product with id ${id} not found`)

        return new Product({
            id: new Id(retrievedProduct.id),
            name: retrievedProduct.name,
            description: retrievedProduct.description,
            purchasePrice: retrievedProduct.purchasePrice,
            stock: retrievedProduct.stock,
            createAt: retrievedProduct.createdAt,
            updatedAt: retrievedProduct.updatedAt,
        })
    }
}