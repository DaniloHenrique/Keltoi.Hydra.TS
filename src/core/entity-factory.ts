import type { IEntity } from "./entity";

export interface IEntityFactory<
    TKey, 
    TEntity extends IEntity<TKey>
> {
    readonly tableName: string;
    build(data: {}): TEntity;
}