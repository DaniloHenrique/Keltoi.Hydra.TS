import { Result, ResultType } from '../../../core';
import type { IApiRepository } from './api-repository';

export interface IReadRepository<TEntity> extends IApiRepository<TEntity>{
    get(id: string): Promise<Result<TEntity|ResultType>>;
    list(): Promise<Result<TEntity[]|ResultType>>;
}