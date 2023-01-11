import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/entity/invoice"
import Address from "../../domain/value-object/address"
import FindInvoiceUseCase from "./find-invoice.usecase"

const mockRepo = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
    }
}

describe("FindInvoiceUseCase unit tests", () => {
    it("should find an invoice", async () => {
        const address = new Address(
            "street for invoice 1",
            "number for invoice 1",
            "complement for invoice 1",
            "city for invoice 1",
            "state for invoice 1",
            "zipCode for invoice 1",
        );
        const invoice = new Invoice(
            "Invoice 1",
            "Document for invoice 1",
            address,
            [],
            new Id("1"),
            new Date(),
            new Date(),
        )

        const repo = mockRepo();
        repo.find.mockReturnValue(invoice);

        const useCase = new FindInvoiceUseCase(repo);

        const output = await useCase.execute({ id: invoice.id.id });

        expect(output.id).toBe(invoice.id.id);
        expect(output.name).toBe(invoice.name);
        expect(output.document).toBe(invoice.document);
        expect(output.address).toStrictEqual({
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
        });
        expect(output.items).toStrictEqual([]);
        expect(output.total).toBe(0);
    })
})