import type { ITraceable } from "./traceable";

export interface IChangeable<TKey> extends ITraceable<TKey> {
    readonly updatedAt: Date;
    readonly active: boolean;
}