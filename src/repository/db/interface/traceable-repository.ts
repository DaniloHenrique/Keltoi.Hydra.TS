import { ResultType } from "../../../core";

export interface ITraceableRepository<TTraceable>{
    first(order?:'asc'|'desc'): Promise<TTraceable|ResultType>;
    last(order?:'asc'|'desc'): Promise<TTraceable|ResultType>;
    before(date?:Date, order?:'asc'|'desc'): Promise<Array<TTraceable>|ResultType>;
    after(date?:Date, order?:'asc'|'desc'): Promise<Array<TTraceable>|ResultType>;
    list(order?:'asc'|'desc'): Promise<Array<TTraceable>|ResultType>;
}