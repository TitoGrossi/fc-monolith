import ValueObject from "./value-object.interface";

export default class Id<Type> implements ValueObject {
    private _id: Type;

    constructor(id?: Type) {
        this._id = id
    }

    get id(): Type {
        return this._id;
    }
}
