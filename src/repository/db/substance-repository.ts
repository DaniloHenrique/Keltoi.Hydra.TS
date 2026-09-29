import type { IEntityFactory, ISubstance } from "../../core";
import type { IDbContext } from "../../context/db";

import { DbRepository } from "./db-repository";
import { Result, ResultType } from "../../core";


export class SubstanceRepository<
    TKey, 
    TSubstance extends ISubstance<TKey>
> 
    extends DbRepository<TKey,TSubstance> 
{
    constructor(
        public readonly factory: IEntityFactory<TKey, TSubstance>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public getByName(name: string): Promise<Result<TSubstance|ResultType>>{
        return this
            .database
            .first()
            .where({name})
            .then(result => 
                !!result
                    ?new Result<TSubstance>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public getByDescription(description: string): Promise<Result<TSubstance|ResultType>>{
        return this
            .database
            .first()
            .where({description})
            .then(result => 
                !!result
                    ?new Result<TSubstance>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}