import type { ITraceable, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';
import type { IDateTimeRepository } from './interface';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';
import { Ordering } from './interface';

export class TraceableRepository<TKey, TTraceable extends ITraceable<TKey>> 
    extends DbRepository<TKey,TTraceable> 
    implements IDateTimeRepository<TTraceable>
{
    constructor(
        public readonly factory: IEntityFactory<TKey, TTraceable>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public first(order:Ordering = Ordering.Ascending): Promise<Result<TTraceable|ResultType>>{
        return this
            .database
            .first()
            .orderBy('createdAt', order)
            .then(result => 
                !!result
                    ?new Result<TTraceable>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public last(order:Ordering = Ordering.Ascending): Promise<Result<TTraceable|ResultType>>{
        return this
            .database
            .first()
            .orderBy('createdAt', order)
            .then(result => 
                !!result
                    ?new Result<TTraceable>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public before(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<Array<TTraceable>|ResultType>>{
        return this
            .database
            .select()
            .where('createdAt', '<', date)
            .orderBy('createdAt', order)
            .then(result => 
                new Result<Array<TTraceable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public after(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<Array<TTraceable>|ResultType>>{
        return this
            .database
            .select()
            .where('createdAt', '>', date)
            .orderBy('createdAt', order)
            .then(result => 
                new Result<Array<TTraceable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public list(order = Ordering.Ascending): Promise<Result<Array<TTraceable>|ResultType>>{
        return this
            .database
            .select()
            .orderBy('createdAt', order)
            .then(result => 
                new Result<Array<TTraceable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public update = (entity: TTraceable): Promise<Result<ResultType>>=>{
        return Promise.reject('Not implemented');
    }

    public delete = (entity: TTraceable): Promise<Result<ResultType>>=>{
        return Promise.reject('Not implemented');
    }
}