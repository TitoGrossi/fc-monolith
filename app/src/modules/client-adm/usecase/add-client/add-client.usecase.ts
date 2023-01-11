import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface<AddClientInputDto, AddClientOutputDto> {
    private _clientRepository: ClientGateway

    constructor(clientRepo: ClientGateway) {
        this._clientRepository = clientRepo;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const client = new Client({
            name: input.name,
            email: input.email,
            address: input.address,
        })

        await this._clientRepository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}