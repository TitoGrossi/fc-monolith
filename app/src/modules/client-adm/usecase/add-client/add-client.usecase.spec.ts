import AddClientUseCase from "./add-client.usecase";

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add Client Usecase unit test", () => {
    it("should add a client", async () => {
        const repository = mockRepository();
        const useCase = new AddClientUseCase(repository);

        const input = {
            id: "1",
            name: "Client 1",
            email: "example@example.com",
            address: "Crompton",
        };

        const result = await useCase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).not.toBeNull();
        expect(result.id).not.toBeUndefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.address).toBe(input.address);
    })
})