import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class SequelizeClientRepository implements ClientGateway {
    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async find(id: string): Promise<Client> {
        const clientDB = await ClientModel.findByPk(id)

        return new Client({
            id: new Id(clientDB.id),
            name: clientDB.name,
            email: clientDB.email,
            address: clientDB.address,
            createdAt: clientDB.createdAt,
            updatedAt: clientDB.updatedAt,
        })
    }
}
