import { Result, ResultType } from "../../../core";
import { Ordering } from "./ordering";

export interface IDateTimeRepository<TEntity>{
    after(date: Date, order: Ordering): Promise<Result<Array<TEntity>|ResultType>>;
    before(date: Date, order: Ordering): Promise<Result<Array<TEntity>|ResultType>>;
    first(order: Ordering): Promise<Result<TEntity|ResultType>>;
    last(order: Ordering): Promise<Result<TEntity|ResultType>>;
    orderedList(order: Ordering): Promise<Result<Array<TEntity>|ResultType>>;
}