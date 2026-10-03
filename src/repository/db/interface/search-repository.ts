import { Result } from "../../../core";

export interface ISearchRepository<TEntity>{
    search(q: string): Promise<Result<Array<TEntity>>>;
}