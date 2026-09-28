import type { IEntity } from "./entity";
import type { IModel } from "./model";

export interface IEntityFactory<
    TKey, 
    TModel extends IModel,
    TEntity extends IEntity<TKey, TModel>
> {
    tableName: string;
    build(data: any): TEntity;
}