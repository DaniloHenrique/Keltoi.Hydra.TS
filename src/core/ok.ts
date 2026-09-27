export interface IOk<T> {
  readonly code: number;
  readonly data: T;
}