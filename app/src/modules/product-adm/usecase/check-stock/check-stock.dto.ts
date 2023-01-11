import Id from "../../../@shared/domain/value-object/id.value-object";

export interface CheckStockInputDto {
    id: Id<string>
}

export interface CheckStockOutputDto {
    stock: number;
}
