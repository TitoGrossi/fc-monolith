import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface<FindClientUseCaseInputDto, FindClientUseCaseOutputDto> {
    private _clientRepository: ClientGateway

    constructor(clientRepo: ClientGateway) {
        this._clientRepository = clientRepo;
    }

    async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {
        const client = await this._clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}
