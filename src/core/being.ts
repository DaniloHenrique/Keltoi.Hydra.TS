import type { IEntity } from './entity.js';

export interface IBeing<TKey> extends IEntity<TKey> {
    readonly description: string
}