import { PaymentStatus } from "../../domain/transaction";

export interface ProcessPaymentInputDto {
    amount: number;
    orderId: string;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    orderId: string;
    amount: number;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}
