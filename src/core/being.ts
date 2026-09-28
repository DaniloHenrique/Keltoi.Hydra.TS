import type { IEntity } from './entity.js';
import type { IModel } from './model.js';

export interface IBeing<TKey, TModel extends IModel> extends IEntity<TKey, TModel> {
    readonly description: string
}