import type { ICommandRepository } from "./command-repository";
import type { IReadRepository } from "./read-repository";

export interface IRestRepository<TEntity> extends IReadRepository<TEntity>, ICommandRepository<TEntity>{}