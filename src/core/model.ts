import type { IEntityFactory } from "./entity-factory";
import type { ResultType } from "./result-types";
import type { Result } from "./result";
import type { IEntity } from "./entity";

export interface IModel<TKey, TEntity extends IEntity<TKey>> {
  validate(factory:IEntityFactory<TKey, TEntity>): Result<TEntity|ResultType>;
}
