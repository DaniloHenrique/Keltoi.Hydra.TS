import type { IThing, IEntityFactory, IModel } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class ThingRepository<
    TKey, 
    TModel extends IModel, 
    TThing extends IThing<TKey,TModel>
> extends DbRepository<
    TKey,
    TModel,
    TThing
> {
    constructor(
        public readonly factory: IEntityFactory<TKey, TModel, TThing>,
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
                result.length > 0 
                    ?new Result<TThing>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
    
}