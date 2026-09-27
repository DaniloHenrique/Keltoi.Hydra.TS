export interface ISearchRepository<TEntity>{
    search(q: string): Promise<TEntity[]>;
}