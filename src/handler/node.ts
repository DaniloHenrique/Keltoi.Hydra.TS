export interface INode{
    next<T>(param:T|null): Promise<INode>;
}