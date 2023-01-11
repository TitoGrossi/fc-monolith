import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-product.usecase";

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "client1@example.com",
            address: "Crompton",
        }))),
    }
}

describe("Find Client Usecase unit test", () => {
    it("should find a client", async () => {
        const repository = mockRepository();
        const useCase = new FindClientUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await useCase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe("Client 1");
        expect(result.email).toBe("client1@example.com");
        expect(result.address).toBe("Crompton");
    });
})