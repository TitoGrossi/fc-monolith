import { Sequelize } from "sequelize-typescript";
import Invoice from "../domain/entity/invoice";
import Address from "../domain/value-object/address";
import SequelizeInvoiceRepository from "./invoice.repository";
import { AddressModel } from "./models/address.model";
import { InvoiceModel } from "./models/invoice.model";

describe("SequelizeInvoiceRepository tests", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, AddressModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find an invoice", async () => {
        const addressDB = await AddressModel.create({
            street: "street",
            complement: "complement",
            state: "state",
            city: "city",
            number: "number",
            zipCode: "zip",
        });

        const invoiceDb = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Invoice 1 document",
            createdAt: new Date(),
            updatedAt: new Date(),
            addressId: addressDB.id,
        });

        const retrievedInvoice = await new SequelizeInvoiceRepository().find(invoiceDb.id);

        expect(retrievedInvoice.id.id).toEqual(invoiceDb.id);
        expect(retrievedInvoice.createdAt).toEqual(invoiceDb.createdAt);
        expect(retrievedInvoice.updatedAt).toEqual(invoiceDb.updatedAt);
        expect(retrievedInvoice.document).toEqual(invoiceDb.document);

        expect(retrievedInvoice.address.city).toEqual(addressDB.city);
        expect(retrievedInvoice.address.complement).toEqual(addressDB.complement);
        expect(retrievedInvoice.address.state).toEqual(addressDB.state);
        expect(retrievedInvoice.address.zipCode).toEqual(addressDB.zipCode);
        expect(retrievedInvoice.address.street).toEqual(addressDB.street);
        expect(retrievedInvoice.address.number).toEqual(addressDB.number);
    })

    it("should create an invoice", async () => {
        const address = new Address(
            "street",
            "1A",
            "complement",
            "city",
            "state",
            "zipCode",
        )
        const invoice = new Invoice("invoice", "document", address, []);
        await new SequelizeInvoiceRepository().create(invoice);

        const retrievedInvoice = await InvoiceModel.findByPk(invoice.id.id);

        expect(retrievedInvoice.id).toEqual(invoice.id.id);
        expect(retrievedInvoice.createdAt).toEqual(invoice.createdAt);
        expect(retrievedInvoice.updatedAt).toEqual(invoice.updatedAt);
        expect(retrievedInvoice.name).toEqual(invoice.name);
        expect(retrievedInvoice.document).toEqual(invoice.document);
    });
});
