import type { IEntity } from "./entity";

export interface ITraceable<TKey> extends IEntity<TKey> {
    readonly createdAt: Date
}