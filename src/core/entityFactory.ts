import type { IEntity } from "./entity";

export interface IEntityFactory<
    TKey, 
    TEntity extends IEntity<TKey>
> {
    tableName: string;
    build(data: {}): TEntity;
}