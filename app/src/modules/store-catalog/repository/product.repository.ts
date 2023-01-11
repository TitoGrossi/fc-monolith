import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class SequelizeProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        return (await ProductModel.findAll()).map(product => new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }))
    }

    async find(id: string): Promise<Product> {
        const dbProduct = await ProductModel.findByPk(id)

        return new Product({
            id: new Id(dbProduct.id),
            name: dbProduct.name,
            description: dbProduct.description,
            salesPrice: dbProduct.salesPrice,
        })
    }
}