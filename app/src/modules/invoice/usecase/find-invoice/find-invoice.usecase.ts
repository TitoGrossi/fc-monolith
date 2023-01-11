import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface<FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO> {
    _repository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._repository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this._repository.find(input.id);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item) => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                };
            }),
            total: invoice.items.length,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        };
    }
}