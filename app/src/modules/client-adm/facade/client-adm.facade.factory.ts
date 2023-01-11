import SequelizeClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-product.usecase";
import ClientAdmFacade from "./client-adm.facade";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export default class ClientAdmFacadeFactory {
    static create(): ClientAdmFacadeInterface {
        const clientRepo = new SequelizeClientRepository();
        const addClientUseCase = new AddClientUseCase(clientRepo);
        const findClientUseCase = new FindClientUseCase(clientRepo);

        return new ClientAdmFacade({
            addClient: addClientUseCase,
            findClient: findClientUseCase,
        })
    }
}