import { ResultType, Result } from "../../../core";

export interface IBeingRepository<TBeing>{
    getByDescription(description: string): Promise<Result<TBeing|ResultType>>;
}