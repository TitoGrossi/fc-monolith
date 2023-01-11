import { v4 as uuid } from "uuid";

import Id from "../value-object/id.value-object";

export default class BaseEntity {
    private _id: Id<string>
    private _createdAt: Date
    private _updatedAt: Date

    constructor(id?: Id<string>, createdAt?: Date, updatedAt?: Date) {
        this._id = id ? id : new Id(uuid());
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();
    }

    get id(): Id<string> {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt
    }

    set updatedAt(date: Date) {
        this._updatedAt = date;
    }
}