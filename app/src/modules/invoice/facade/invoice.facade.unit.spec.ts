import { Sequelize } from "sequelize-typescript";

import Invoice from "../domain/entity/invoice";
import Address from "../domain/value-object/address";
import { AddressModel, InvoiceModel } from "../repository/models";
import InvoiceFacadeFactory from "./invoice.facade.factory"
import { GenerateInvoiceIntputFacadeDto } from "./invoice.facade.interface";

describe("Find Invoice Method", () => {
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

    it("should find the proper invoice", async () => {
        const newInvoice = new Invoice(
            "invoice 1",
            "invoice 1 document",
            new Address(
                "invoice 1 street",
                "invoice 1 number",
                "invoice 1 complement",
                "invoice 1 city",
                "invoice 1 complement",
                "invoice 1 zipCode",
            ),
            [],
        );

        const addressDB = await AddressModel.create({
            street: newInvoice.address.street,
            city: newInvoice.address.city,
            number: newInvoice.address.number,
            state: newInvoice.address.state,
            zipCode: newInvoice.address.zipCode,
            complement: newInvoice.address.complement,
        });

        await InvoiceModel.create({
            id: newInvoice.id.id,
            name: newInvoice.name,
            document: newInvoice.document,
            createdAt: newInvoice.createdAt,
            updatedAt: newInvoice.updatedAt,
            addressId: addressDB.id,
        });

        const invoiceFacade = InvoiceFacadeFactory.create();

        const invoice = await invoiceFacade.findInvoice({
            id: newInvoice.id.id
        });

        expect(invoice.address.street).toBe(newInvoice.address.street);
        expect(invoice.address.city).toBe(newInvoice.address.city);
        expect(invoice.address.number).toBe(newInvoice.address.number);
        expect(invoice.address.state).toBe(newInvoice.address.state);
        expect(invoice.address.zipCode).toBe(newInvoice.address.zipCode);
        expect(invoice.address.complement).toBe(newInvoice.address.complement);

        expect(invoice.id).toBe(newInvoice.id.id);
        expect(invoice.name).toBe(newInvoice.name);
        expect(invoice.document).toBe(newInvoice.document);
        expect(invoice.createdAt).toStrictEqual(newInvoice.createdAt);
        expect(invoice.updatedAt).toStrictEqual(newInvoice.updatedAt);
    });
});

describe("Create Invoice Method", () => {
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

    it("should create invoice correctly", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input: GenerateInvoiceIntputFacadeDto = {
            name: "Invoice 1",
            document: "Invoice 1 document",
            street: "Invoice 1 street",
            city: "Invoice 1 city",
            number: "Invoice 1 number",
            state: "Invoice 1 state",
            complement: "Invoice 1 complement",
            zipCode: "Invoice 1 zipCode",
            items: [],
        }

        const invoice = await invoiceFacade.generateInvoice(input)

        // assert output is correct
        expect(invoice.street).toBe(input.street);
        expect(invoice.city).toBe(input.city);
        expect(invoice.number).toBe(input.number);
        expect(invoice.state).toBe(input.state);
        expect(invoice.zipCode).toBe(input.zipCode);
        expect(invoice.complement).toBe(input.complement);

        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);

        // assert data is actually stored
        const retrievedInvoice = await InvoiceModel.findOne({
            where: { id: invoice.id },
            include: { model: AddressModel }
        });

        expect(retrievedInvoice.address.street).toBe(input.street);
        expect(retrievedInvoice.address.city).toBe(input.city);
        expect(retrievedInvoice.address.number).toBe(input.number);
        expect(retrievedInvoice.address.state).toBe(input.state);
        expect(retrievedInvoice.address.zipCode).toBe(input.zipCode);
        expect(retrievedInvoice.address.complement).toBe(input.complement);

        expect(retrievedInvoice.name).toBe(input.name);
        expect(retrievedInvoice.document).toBe(input.document);
    });
});
