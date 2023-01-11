import StoreCatalogFacadeFactory from "../../store-catalog/facade/facade.factory";
import SequelizeInvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const repository = new SequelizeInvoiceRepository();
        const findInvoiceUseCase = new FindInvoiceUseCase(repository);
        const catalogService = StoreCatalogFacadeFactory.create()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository, catalogService);

        return new InvoiceFacade({
            findInvoiceUseCase: findInvoiceUseCase,
            generateInvoiceUseCase: generateInvoiceUseCase,
        })
    }
}
