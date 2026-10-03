import { ResultType, Result } from "../../../core";

export interface IThingRepository<TThing>{
    getByName(name: string): Promise<Result<TThing|ResultType>>;
}