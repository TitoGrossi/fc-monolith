import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import SequelizeClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-product.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("Client Adm Facade tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const clientRepo = new SequelizeClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepo);
        const findClientUseCase = new FindClientUseCase(clientRepo);

        const facade = new ClientAdmFacade({
            addClient: addClientUseCase,
            findClient: findClientUseCase,
        });

        const input = {
            name: "Client 1",
            email: "client1@example.com",
            address: "Crompton",
        };

        await facade.addClient(input);

        const retrievedClient = await ClientModel.findOne({
            where: { name: input.name, email: input.email, address: input.address }
        });

        expect(retrievedClient.name).toBe(input.name);
        expect(retrievedClient.email).toBe(input.email);
        expect(retrievedClient.address).toBe(input.address);

    })

    it("should find a client", async () => {
        const clientDB = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "client1@example.com",
            address: "Crompton",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const clientRepo = new SequelizeClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepo);
        const findClientUseCase = new FindClientUseCase(clientRepo);

        const facade = new ClientAdmFacade({
            addClient: addClientUseCase,
            findClient: findClientUseCase,
        });

        const client = await facade.findClient({ id: clientDB.id });

        expect(client.id).toBe(clientDB.id);
        expect(client.name).toBe(clientDB.name);
        expect(client.email).toBe(clientDB.email);
        expect(client.address).toBe(clientDB.address);
        expect(client.createdAt).toStrictEqual(clientDB.createdAt);
        expect(client.updatedAt).toStrictEqual(clientDB.updatedAt);
    })
})