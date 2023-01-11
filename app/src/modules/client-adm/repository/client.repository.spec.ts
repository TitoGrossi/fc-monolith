import { Sequelize, UpdatedAt } from "sequelize-typescript";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import SequelizeClientRepository from "./client.repository";

describe("ClientRepository tests", () => {
    let sequelize: Sequelize

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
        const client = new Client({
            name: "Client 1",
            email: "client1@example.com",
            address: "Crompton",
        });

        await new SequelizeClientRepository().add(client);

        const retrievedClient = await ClientModel.findByPk(client.id.id);

        expect(retrievedClient.id).toBe(client.id.id);
        expect(retrievedClient.name).toBe(client.name);
        expect(retrievedClient.email).toBe(client.email);
        expect(retrievedClient.address).toBe(client.address);
        expect(retrievedClient.createdAt).toStrictEqual(client.createdAt);
        expect(retrievedClient.updatedAt).toStrictEqual(client.updatedAt);
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

        const client = await new SequelizeClientRepository().find(clientDB.id);

        expect(client.id.id).toBe(clientDB.id);
        expect(client.name).toBe(clientDB.name);
        expect(client.email).toBe(clientDB.email);
        expect(client.address).toBe(clientDB.address);
        expect(client.createdAt).toStrictEqual(clientDB.createdAt);
        expect(client.updatedAt).toStrictEqual(clientDB.updatedAt);
    })
})