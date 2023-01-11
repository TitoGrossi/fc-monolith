import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class Product extends BaseEntity {
    private _name: string;
    private _price: number;

    constructor(name: string, price: number, id?: Id<string>, createdAt?: Date, updatedAt?: Date) {
        super(id, createdAt, updatedAt);
        this._name = name;
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}