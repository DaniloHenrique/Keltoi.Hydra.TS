import { Result, ResultType } from "../core";

export interface IUseCaseHandler<TParam, TResult>{
    handle(param: TParam): Promise<Result<TResult|ResultType>>;
}