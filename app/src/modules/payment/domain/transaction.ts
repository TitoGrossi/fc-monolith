import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

export enum PaymentStatus {
    Pending = 1,
    Approved = 2,
    Declined = 3,
}

type TransactionProps = {
    id?: Id<string>;
    amount: number;
    orderId: string;
    createdAt?: Date,
    updatedAt?: Date,
};

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: string;
    private _status: PaymentStatus;

    constructor(props: TransactionProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = PaymentStatus.Pending;
        this.validate();
    }

    get amount(): number {
        return this._amount;
    }

    get orderId(): string {
        return this._orderId;
    }

    get status(): PaymentStatus {
        return this._status;
    }

    private set status(status: PaymentStatus) {
        this._status = status;
    }

    private approve(): void {
        this.status = PaymentStatus.Approved;
    }

    private decline(): void {
        this.status = PaymentStatus.Declined;
    }

    process(): void {
        if (this._status !== PaymentStatus.Pending) throw new Error("Payment has already been processed")
        if (this._amount >= 100) this.approve();
        else this.decline();
        this.updatedAt = new Date()
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
        if (this._amount < 100 && this._status === PaymentStatus.Approved) {
            throw new Error("Only payments of 100 and greater can be approved")
        }
    }
}
