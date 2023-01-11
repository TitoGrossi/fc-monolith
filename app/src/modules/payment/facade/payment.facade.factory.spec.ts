import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "./payment.facade.factory";

describe("PaymentFacadeFactory tests", () => {

    it("should return a facade", async () => {
        const paymentFacade = PaymentFacadeFactory.create();

        expect(paymentFacade).toBeInstanceOf(PaymentFacade);
    })
})
