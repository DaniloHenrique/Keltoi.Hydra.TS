import type { ITraceable } from "./traceable";
import type { IModel } from "./model";
export interface IChangeable<TKey, TModel extends IModel> extends ITraceable<TKey, TModel> {
    readonly updatedAt: Date;
    readonly active: boolean;
}