import StoreCatalogFacadeFactory from "./facade.factory";
import StoreCatalogFacade from "./store-catalog.facade";

describe("ProductAdmFacadeFactory tests", () => {

    it("should return a facade", async () => {
        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        expect(storeCatalogFacade).toBeInstanceOf(StoreCatalogFacade);
    })
});
