import type { IBeing, IEntityFactory} from '../../core';
import type { IDbContext } from '../../context/db';
import type { IModel } from '../../core/model';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';


export class BeingRepository<
    TKey, 
    TModel extends IModel, 
    TBeing extends IBeing<TKey,TModel>
> extends 
    DbRepository<TKey, TModel, TBeing> 
{
    constructor(
        public readonly factory: IEntityFactory<TKey, TModel, TBeing>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public getByDescription(description: string): Promise<Result<TBeing|ResultType>>{
        return this
            .database
            .first()
            .where({description})
            .then(result => 
                result.length > 0 
                    ?new Result<TBeing>(200, this.factory.build(result[0].toJSON()))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}