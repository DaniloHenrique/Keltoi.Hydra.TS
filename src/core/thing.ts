import type { IEntity } from './entity';
import type { IModel } from './model';

export interface IThing<TKey, TModel extends IModel> extends IEntity<TKey, TModel> {
    readonly name:string;
}