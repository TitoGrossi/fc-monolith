import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Invoice from "../../domain/entity/invoice";
import Product from "../../domain/entity/product";
import Address from "../../domain/value-object/address";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto> {
    private _invoiceGateway: InvoiceGateway;
    private _catalogService: StoreCatalogFacadeInterface;

    constructor(gateway: InvoiceGateway, catalogService: StoreCatalogFacadeInterface) {
        this._invoiceGateway = gateway;
        this._catalogService = catalogService;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode,
        );
        const items: Product[] = [];
        for (const productRef of input.items) {
            const product = await this._catalogService.find({ id: productRef.id });
            items.push(new Product(product.name, product.salesPrice, new Id(product.id)));
        };
        const invoice = new Invoice(input.name, input.document, address, items);

        await this._invoiceGateway.create(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => {
                return { id: item.id.id, name: item.name, price: item.price }
            }),
            total: invoice.total,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        };
    }
}
