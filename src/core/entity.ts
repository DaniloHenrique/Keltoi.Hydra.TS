import type { IModel } from "./model";

export interface IEntity<TKey> {
  readonly id: TKey;
  toModel(): IModel;
  toData(): any;
  toKey(): any;
}
