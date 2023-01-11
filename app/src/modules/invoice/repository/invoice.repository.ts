import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import Address from "../domain/value-object/address";
import InvoiceGateway from "../gateway/invoice.gateway";
import { AddressModel } from "./models";
import { InvoiceModel } from "./models/invoice.model";

export default class SequelizeInvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const retrievedInvoice = await InvoiceModel.findOne({
            where: { id: id },
            include: { model: AddressModel }
        });

        const address = new Address(
            retrievedInvoice.address.street,
            retrievedInvoice.address.number,
            retrievedInvoice.address.complement,
            retrievedInvoice.address.city,
            retrievedInvoice.address.state,
            retrievedInvoice.address.zipCode,
        )

        const invoice = new Invoice(
            retrievedInvoice.name,
            retrievedInvoice.document,
            address,
            [],
            new Id(retrievedInvoice.id),
            retrievedInvoice.createdAt,
            retrievedInvoice.updatedAt,
        );

        return invoice;
    }

    async create(input: Invoice): Promise<Invoice> {
        const addressDB = await AddressModel.create({
            street: input.address.street,
            city: input.address.city,
            number: input.address.number,
            state: input.address.state,
            zipCode: input.address.zipCode,
            complement: input.address.complement,
        });

        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            addressId: addressDB.id,
        });
        return input;
    }
}
