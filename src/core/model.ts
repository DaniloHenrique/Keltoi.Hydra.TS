import type { ResultType } from "./result-types";
import type { Result } from "./result";

export interface IModel {
  validate<T>(): Result<T|ResultType>;
}
