export interface IEntity<TKey> {
  readonly id: TKey;

  toData(): {};
  toKey():{};
}
