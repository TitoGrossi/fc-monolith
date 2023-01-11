import { Model, Column, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { AddressModel } from "./address.model";

@Table({
    tableName: "invoice",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;

    @BelongsTo(() => AddressModel)
    address: AddressModel;

    @ForeignKey(() => AddressModel)
    @Column({ allowNull: false })
    addressId: number;
};
