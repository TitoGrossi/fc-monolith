import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-product.usecase";
import ClientAdmFacadeInterface, {
    AddClientAdmFacadeInputDto,
    AddClientAdmFacadeOutputDto,
    FindClientAdmFacadeInputDto,
    FindClientAdmFacadeOutputDto
} from "./client-adm.facade.interface";

interface facadeProps {
    addClient: AddClientUseCase;
    findClient: FindClientUseCase;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addClientUseCase: AddClientUseCase;
    private _findClientUseCase: FindClientUseCase;

    constructor(props: facadeProps) {
        this._addClientUseCase = props.addClient;
        this._findClientUseCase = props.findClient
    }

    async addClient(input: AddClientAdmFacadeInputDto): Promise<AddClientAdmFacadeOutputDto> {
        return this._addClientUseCase.execute(input)
    }

    async findClient(input: FindClientAdmFacadeInputDto): Promise<FindClientAdmFacadeOutputDto> {
        return this._findClientUseCase.execute(input)
    }
}