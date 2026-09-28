import type { IModel } from "./model";

export interface IEntity<TKey, TModel extends IModel> {
  readonly id: TKey;
  toModel(): IModel;
  toData(): any;
  toKey(): any;
}
