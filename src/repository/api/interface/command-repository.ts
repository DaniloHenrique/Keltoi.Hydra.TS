import { Result, ResultType } from '../../../core';
import type { IApiRepository } from './api-repository';

export interface ICommandRepository<TEntity> extends IApiRepository<TEntity>{
    create(entity: TEntity): Promise<Result<TEntity|ResultType>>;
    insert(entity: TEntity): Promise<Result<ResultType>>;
    update(entity: TEntity): Promise<Result<ResultType>>;
    delete(id: string): Promise<Result<ResultType>>;
}