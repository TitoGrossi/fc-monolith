import { PaymentStatus } from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const mockRepository = () => {
    return {
        save: jest.fn(),
    }
}

describe("Process Payment Usecase unit tests", () => {
    it("should decline a payment less than 100", async () => {
        const repo = mockRepository();

        const useCase = new ProcessPaymentUseCase(repo);

        const input = {
            amount: 99,
            orderId: "1",
        }

        const payment = await useCase.execute(input);

        expect(payment.amount).toBe(input.amount);
        expect(payment.orderId).toBe(input.orderId);
        expect(payment.status).toBe(PaymentStatus.Declined);
    })

    it("should approve a payment equal to 100", async () => {
        const repo = mockRepository();

        const useCase = new ProcessPaymentUseCase(repo);

        const input = {
            amount: 100,
            orderId: "1",
        }

        const payment = await useCase.execute(input);

        expect(payment.amount).toBe(input.amount);
        expect(payment.orderId).toBe(input.orderId);
        expect(payment.status).toBe(PaymentStatus.Approved);
        expect(repo.save).toHaveBeenCalledTimes(1);
    })

    it("should approve a payment grater than 100", async () => {
        const repo = mockRepository();

        const useCase = new ProcessPaymentUseCase(repo);

        const input = {
            amount: 150,
            orderId: "1",
        }

        const payment = await useCase.execute(input);

        expect(payment.amount).toBe(input.amount);
        expect(payment.orderId).toBe(input.orderId);
        expect(payment.status).toBe(PaymentStatus.Approved);
    })
})
