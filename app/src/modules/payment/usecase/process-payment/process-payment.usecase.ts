import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto> {
    private _paymentRepository: PaymentGateway
    constructor(paymentRepo: PaymentGateway) {
        this._paymentRepository = paymentRepo;
    }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,
        })

        transaction.process()

        await this._paymentRepository.save(transaction);

        return {
            transactionId: transaction.id.id,
            amount: transaction.amount,
            orderId: transaction.orderId,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }
    }
}
