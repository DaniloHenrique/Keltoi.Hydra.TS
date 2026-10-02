import { ResultType, Result } from "../../../core";
import type { IPaging } from "./paging";

export interface IPagingRepository<TEntity, TPaging extends IPaging>{
    pageSearch(paging: TPaging): Promise<Result<Array<TEntity>|ResultType>>;
}