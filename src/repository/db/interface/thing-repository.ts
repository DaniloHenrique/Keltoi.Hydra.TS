import { ResultType } from "../../../core";

export interface IThingRepository<TThing>{
    getByName(name: string): Promise<TThing|ResultType>;
}