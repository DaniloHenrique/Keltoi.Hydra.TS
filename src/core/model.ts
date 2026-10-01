import type { ResultType } from "./result-types";
import type { Result } from "./result";
import type { IEntity } from "./entity";

export interface IModel<TKey, TEntity extends IEntity<TKey>> {
  validate(): Result<TEntity|ResultType>;
}
