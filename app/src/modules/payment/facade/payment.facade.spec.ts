import { Sequelize } from "sequelize-typescript";
import SequelizePaymentRepository from "../repository/payment.repository";
import TransactionModel from "../repository/transaction.model";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("PaymentFacade tests", () => {
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

    it("should create a transaction", async () => {
        const repo = new SequelizePaymentRepository();
        const useCase = new ProcessPaymentUseCase(repo);
        const facade = new PaymentFacade(useCase);

        const input = {
            orderId: "1",
            amount: 100,
        }

        const res = await facade.process(input);

        expect(res.amount).toBe(input.amount);
        expect(res.orderId).toBe(input.orderId);
        expect(res.status).toBe("Approved");
    })
})