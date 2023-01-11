import ProductGateway from "../../gateway/product.gateway";
import Product from "../../domain/product.entity";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
    private _repo: ProductGateway

    constructor(repo: ProductGateway) {
        this._repo = repo;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const product = new Product({
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        });

        this._repo.add(product);

        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }
    }
}