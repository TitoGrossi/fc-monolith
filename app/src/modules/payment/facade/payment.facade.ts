import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { PaymentStatus } from "../domain/transaction";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "../usecase/process-payment/process-payment.dto";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
    private _processPaymentUseCase: UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto>

    constructor(processPaymentUseCase: UseCaseInterface<ProcessPaymentInputDto, ProcessPaymentOutputDto>) {
        this._processPaymentUseCase = processPaymentUseCase
    }

    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        const res = await this._processPaymentUseCase.execute(input)

        return { ...res, status: PaymentStatus[res.status] }
    }
}