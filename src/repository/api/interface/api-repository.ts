import type { IApiContext } from '../../../context/api/interface';

export interface IApiRepository<TEntity>{
    readonly context: IApiContext;  
}