interface Address {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

interface Item {
    id: string;
    name: string;
    price: number;
}

export interface FindInvoiceInputFacadeDto {
    id: string;
}

export interface FindInvoiceOutputFacadeDto {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: Item[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface GenerateInvoiceIntputFacadeDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string
    }[];
}

export interface GenerateInvoiceOutputFacadeDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: Item[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export default interface InvoiceFacadeInterface {
    findInvoice: (input: FindInvoiceInputFacadeDto) => Promise<FindInvoiceOutputFacadeDto>
    generateInvoice: (input: GenerateInvoiceIntputFacadeDto) => Promise<GenerateInvoiceOutputFacadeDto>
}
