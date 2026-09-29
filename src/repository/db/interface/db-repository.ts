import type { IDbTransaction } from "../../../context/db";
import { Result, ResultType } from "../../../core";

export interface IDbRepository<TEntity>{
    set transaction(context: IDbTransaction);

    insert(entity: TEntity): Promise<Result<ResultType>>;
    create(entity: TEntity): Promise<Result<TEntity|ResultType>>;
    get(entity: TEntity): Promise<Result<TEntity|ResultType>>;
    update(entity: TEntity): Promise<Result<ResultType>>;
    delete(entity: TEntity): Promise<Result<ResultType>>;
    list(): Promise<Result<Array<TEntity>|ResultType>>;
}