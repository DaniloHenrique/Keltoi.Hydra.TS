import { Result, ResultType } from "../core";

export interface IQueryHandler<TQuery, TResult>{
    query(q: TQuery): Promise<Result<TResult|ResultType>>;
}