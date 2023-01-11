import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, {
    FindInvoiceInputFacadeDto,
    FindInvoiceOutputFacadeDto,
    GenerateInvoiceIntputFacadeDto,
    GenerateInvoiceOutputFacadeDto
} from "./invoice.facade.interface";


interface IProps {
    findInvoiceUseCase: FindInvoiceUseCase;
    generateInvoiceUseCase: GenerateInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findInvoiceUseCase: FindInvoiceUseCase;
    private _generateInvoiceUseCase: GenerateInvoiceUseCase;

    constructor(props: IProps) {
        this._findInvoiceUseCase = props.findInvoiceUseCase;
        this._generateInvoiceUseCase = props.generateInvoiceUseCase;
    }

    async findInvoice(input: FindInvoiceInputFacadeDto): Promise<FindInvoiceOutputFacadeDto> {
        return this._findInvoiceUseCase.execute(input);
    }

    async generateInvoice(input: GenerateInvoiceIntputFacadeDto): Promise<GenerateInvoiceOutputFacadeDto> {
        return this._generateInvoiceUseCase.execute(input);
    }
}
