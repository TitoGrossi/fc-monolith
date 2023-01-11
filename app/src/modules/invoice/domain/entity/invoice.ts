import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import Product from "./product";

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(
        name: string,
        document: string,
        address: Address,
        items: Product[],
        id?: Id<string>,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        super(id, createdAt, updatedAt);
        this._name = name;
        this._document = document;
        this._address = address;
        this._items = items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document
    }

    get address(): Address {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, curr) => curr.price + acc, 0)
    }
}