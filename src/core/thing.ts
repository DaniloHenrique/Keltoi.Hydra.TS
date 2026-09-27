import type { IEntity } from './entity';

export interface IThing<TKey> extends IEntity<TKey> {
    readonly name:string;
}