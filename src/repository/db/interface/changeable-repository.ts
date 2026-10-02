import { ResultType, Result } from "../../../core";
import type { IDateTimeRepository } from "./date-time-repository";

export interface IChangeableRepository<TChangeable> extends IDateTimeRepository<TChangeable>{
    reactive(entity: TChangeable): Promise<Result<ResultType>>;
    deadList(): Promise<Result<ResultType>>;
}