export interface AddClientAdmFacadeInputDto {
    name: string;
    email: string;
    address: string;
}

export interface AddClientAdmFacadeOutputDto { }

export interface FindClientAdmFacadeInputDto {
    id: string;
}

export interface FindClientAdmFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
    addClient(input: AddClientAdmFacadeInputDto): Promise<AddClientAdmFacadeOutputDto>;
    findClient(input: FindClientAdmFacadeInputDto): Promise<FindClientAdmFacadeOutputDto>;
}
