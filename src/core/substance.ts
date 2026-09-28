import type { IBeing } from "./being"
import type { IThing } from "./thing"
import type { IModel } from "./model"

export interface ISubstance<TKey,TModel extends IModel> extends IBeing<TKey,TModel>, IThing<TKey,TModel> {}