import type { IBeing } from "./being"
import type { IThing } from "./thing"

export interface ISubstance<TKey> extends IBeing<TKey>, IThing<TKey> {}