import type { Result, ResultType } from "../core";

export interface IListHandler<TResult>{
    list(): Promise<Result<TResult|ResultType>>;
}