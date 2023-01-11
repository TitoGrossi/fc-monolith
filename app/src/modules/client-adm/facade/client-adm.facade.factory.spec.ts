import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-product.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeFactory from "./client-adm.facade.factory"

describe("Client Adm Facade Factory tests", () => {
    it("should return a Client Adm Facade", async () => {
        const facade = ClientAdmFacadeFactory.create();

        expect(facade).toBeInstanceOf(ClientAdmFacade);
        expect(facade).toHaveProperty("_addClientUseCase");
        expect(facade).toHaveProperty("_findClientUseCase");
        // @ts-ignore
        expect(facade._addClientUseCase).toBeInstanceOf(AddClientUseCase);
        // @ts-ignore
        expect(facade._findClientUseCase).toBeInstanceOf(FindClientUseCase);
    })
})