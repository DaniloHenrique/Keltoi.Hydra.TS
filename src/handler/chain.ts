import type { INode } from "./node";

export class Chain<TFirstStep extends INode, TLastStep extends INode>{
    async handle<TParam>(input: TFirstStep, param: TParam|null): Promise<TLastStep>{
        const chain:TLastStep = (await input.next<TParam>(param)) as TLastStep;

        return chain;
    }
}