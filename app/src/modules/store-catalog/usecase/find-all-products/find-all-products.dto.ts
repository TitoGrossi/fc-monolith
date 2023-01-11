interface Product {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export type FindAllProductDto = Product[]
