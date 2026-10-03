import { ResultType, Result } from "../../../core";

export interface ISubstanceRepository<TSubstance>{
    getByName(name: string): Promise<Result<TSubstance|ResultType>>;
    getByDescription(description: string): Promise<Result<TSubstance|ResultType>>;
}