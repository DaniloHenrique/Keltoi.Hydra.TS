import type { IThing, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class ThingRepository<
    TKey, 
    TThing extends IThing<TKey>
> extends DbRepository<
    TKey,
    TThing
> {
    constructor(
        public readonly factory: IEntityFactory<TKey, TThing>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public getByName(name: string): Promise<Result<TThing|ResultType>>{
        return this
            .database
            .first()
            .where({name})
            .then(result => 
                !!result
                    ?new Result<TThing>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
    
}