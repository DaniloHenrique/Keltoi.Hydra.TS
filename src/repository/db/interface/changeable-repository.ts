import { ResultType, Result } from "../../../core";


export interface IChangeableRepository<TChangeable>{
    reactive(entity: TChangeable): Promise<Result<ResultType>>;
    deadList(): Promise<Result<ResultType>>;
    list(order?:'asc'|'desc'): Promise<Array<TChangeable>|ResultType>;
    after(date?:Date, order?:'asc'|'desc'): Promise<Array<TChangeable>|ResultType>;
    before(date?:Date, order?:'asc'|'desc'): Promise<Array<TChangeable>|ResultType>;
    last(order?:'asc'|'desc'): Promise<TChangeable|ResultType>;
    first(order?:'asc'|'desc'): Promise<TChangeable|ResultType>;
}