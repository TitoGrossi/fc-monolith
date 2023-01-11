import transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class SequelizePaymentRepository implements PaymentGateway {
    async save(transaction: transaction): Promise<void> {
        await TransactionModel.create({
            id: transaction.id.id,
            amount: transaction.amount,
            orderId: transaction.orderId,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        })
    }
}