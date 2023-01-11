import { Sequelize } from "sequelize-typescript";
import Transaction from "../domain/transaction";
import SequelizePaymentRepository from "./payment.repository";
import TransactionModel from "./transaction.model";

describe("Payment Repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new transaction", async () => {
        const payment = new Transaction({
            amount: 100,
            orderId: "1",
        });

        const repo = new SequelizePaymentRepository();

        await repo.save(payment);

        const retrievedPayment = await TransactionModel.findByPk(payment.id.id);

        expect(retrievedPayment.id).toBe(payment.id.id);
        expect(retrievedPayment.amount).toBe(payment.amount);
        expect(retrievedPayment.status).toStrictEqual(payment.status.toString());
        expect(retrievedPayment.orderId).toBe(payment.orderId);
        expect(retrievedPayment.createdAt).toStrictEqual(payment.createdAt);
        expect(retrievedPayment.updatedAt).toStrictEqual(payment.updatedAt);
    })
})