import type { IThing, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class ThingRepository<TKey> extends DbRepository<TKey, IThing<TKey>> {
    constructor(
        public readonly factory: IEntityFactory<TKey, IThing<TKey>>, 
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public getByName(name: string): Promise<Result<IThing<TKey>|ResultType>>{
        return this
            .database
            .first()
            .where({name})
            .then(result => 
                result.length > 0 
                    ?new Result<IThing<TKey>>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
    
}