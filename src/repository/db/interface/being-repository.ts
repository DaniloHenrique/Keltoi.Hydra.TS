import { ResultType } from "../../../core";

export interface IBeingRepository<TBeing>{
    getByDescription(description: string): Promise<TBeing|ResultType>;
}