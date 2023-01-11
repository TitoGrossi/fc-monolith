import { Model, Column, PrimaryKey, Table, AutoIncrement } from "sequelize-typescript";

@Table({
    tableName: "address",
    timestamps: false,
})
export class AddressModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ allowNull: false })
    id: number;

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column({ allowNull: false })
    complement: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;
};
