import SequelizePaymentRepository from "../repository/payment.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface from "./facade.interface";
import PaymentFacade from "./payment.facade";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repo = new SequelizePaymentRepository();
        const useCase = new ProcessPaymentUseCase(repo);

        return new PaymentFacade(useCase);
    }
}