import { ResultType, Result } from "../../../core";
import type { IPaging } from "./paging";

export interface IPagingRepository<TEntity>{
    pageSearch<TPaging extends IPaging>(paging: TPaging): Promise<Result<TEntity[]|ResultType>>;
}