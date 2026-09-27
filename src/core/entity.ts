import type { IModel } from "./model";

export interface IEntity<TKey> {
  readonly id: TKey;
  toModel<TModel extends IModel>(): TModel;
  toData(): any;
  toKey(): any;
}
