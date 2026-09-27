import type { IChangeable, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';
import type { IDateTimeRepository } from './interface';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository'; 
import { Ordering} from './interface';

export class ChangeableRepository<TKey> 
    extends DbRepository<TKey, IChangeable<TKey>> 
    implements IDateTimeRepository<IChangeable<TKey>>
{
    constructor(
        public readonly factory: IEntityFactory<TKey, IChangeable<TKey>>, 
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public insert (entity: IChangeable<TKey>): Promise<Result<ResultType>>{
        return this
            .database
            .insert({
                ...entity.toKey(), 
                ...entity.toData(),
                createdAt: entity.createdAt,
                active: entity.active
            })
            .then(result => 
                result.length > 0 
                    ?new Result<ResultType>(201, ResultType.Created)
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public update = (entity: IChangeable<TKey>): Promise<Result<ResultType>>=>{
        return this
            .database
            .update({
                ...entity.toData(),
                updatedAt: entity.updatedAt
            })
            .where(entity.toKey())
            .then(result => 
                result > 0 
                    ?new Result<ResultType>(200, ResultType.Updated)
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public delete = (entity: IChangeable<TKey>): Promise<Result<ResultType>>=>{
        return this
            .database
            .update({
                updatedAt: entity.updatedAt,
                active: false
            })
            .where(entity.toKey())
            .then(result => 
                result > 0 
                    ?new Result<ResultType>(200, ResultType.Deleted)
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public reactive = (entity: IChangeable<TKey>): Promise<Result<ResultType>>=>{
        return this
            .database
            .update({
                updatedAt: entity.updatedAt,
                active: true
            })
            .where(entity.toKey())
            .then(result => 
                result > 0 
                    ?new Result<ResultType>(200, ResultType.Updated)
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public deadList = (): Promise<Result<ResultType>>=>{
        return this
            .database
            .select()
            .where('active', false)
            .then(result => 
                new Result<ResultType>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }



    public after(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<IChangeable<TKey>[]|ResultType>>{
        return this
            .database
            .select()
            .where('updatedAt', '>', date)
            .andWhere('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<IChangeable<TKey>[]>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public before(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<IChangeable<TKey>[]|ResultType>>{
        return this
            .database
            .select()
            .where('updatedAt', '<', date)
            .andWhere('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<IChangeable<TKey>[]>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public last(order:Ordering = Ordering.Ascending): Promise<Result<IChangeable<TKey>|ResultType>>{
        return this
            .database
            .first()
            .orderBy('updatedAt', order)
            .where('active', true)
            .then(result => 
                result.length > 0 
                    ?new Result<IChangeable<TKey>>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public first(order:Ordering = Ordering.Ascending): Promise<Result<IChangeable<TKey>|ResultType>>{
        return this
            .database
            .first()
            .orderBy('updatedAt', order)
            .where('active', true)
            .then(result => 
                result.length > 0 
                    ?new Result<IChangeable<TKey>>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public list(order = Ordering.Ascending): Promise<Result<IChangeable<TKey>[]|ResultType>>{
        return this
            .database
            .select()
            .where('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<IChangeable<TKey>[]>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}