import { ResultType } from "../../../core";

export interface ISubstanceRepository<TSubstance>{
    getByName(name: string): Promise<TSubstance|ResultType>;
    getByDescription(description: string): Promise<TSubstance|ResultType>;
}