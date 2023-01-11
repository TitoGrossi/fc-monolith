import Invoice from "../domain/entity/invoice";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>;
    create(input: Invoice): Promise<Invoice>;
}
