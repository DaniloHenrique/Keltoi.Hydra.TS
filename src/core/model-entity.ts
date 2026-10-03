import type { IModel } from "./model";
import type { IEntity } from "./entity";

export interface IModelEntity<TKey> extends IEntity<TKey>{
    toModel(): IModel<TKey,IEntity<TKey>>;
}