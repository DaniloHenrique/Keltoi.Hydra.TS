import { Result, ResultType } from "../core";

export interface ICommandHandler<TCommand>{
    execute(command: TCommand): Result<ResultType>;
}