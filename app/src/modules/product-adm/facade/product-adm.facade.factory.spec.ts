import ProductAdmFacadeFactory from "./facade.factory";
import ProductAdmFacade from "./product-adm.facade";

describe("ProductAdmFacadeFactory tests", () => {

    it("should return a facade", async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        expect(productFacade).toBeInstanceOf(ProductAdmFacade);
    })
})
