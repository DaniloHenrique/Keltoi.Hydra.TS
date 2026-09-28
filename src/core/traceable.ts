import type { IEntity } from "./entity";
import type { IModel } from "./model";
export interface ITraceable<TKey, TModel extends IModel> extends IEntity<TKey, TModel> {
    readonly createdAt: Date
}