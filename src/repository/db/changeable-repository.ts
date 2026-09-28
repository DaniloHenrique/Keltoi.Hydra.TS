import type { IChangeable, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';
import type { IDateTimeRepository } from './interface';
import type { IModel } from '../../core';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository'; 
import { Ordering} from './interface';

export class ChangeableRepository<
    TKey, 
    TModel extends IModel, 
    TChangeable extends IChangeable<TKey,TModel>
> 
    extends DbRepository<TKey, TModel, TChangeable> 
    implements IDateTimeRepository<TChangeable>
{
    constructor(
        public readonly factory: IEntityFactory<TKey, TModel, TChangeable>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public insert (entity: TChangeable): Promise<Result<ResultType>>{
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

    public update = (entity: TChangeable): Promise<Result<ResultType>>=>{
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

    public delete = (entity: TChangeable): Promise<Result<ResultType>>=>{
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

    public reactive = (entity: TChangeable): Promise<Result<ResultType>>=>{
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



    public after(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<Array<TChangeable>|ResultType>>{
        return this
            .database
            .select()
            .where('updatedAt', '>', date)
            .andWhere('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<Array<TChangeable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public before(date = new Date(), order:Ordering = Ordering.Ascending): Promise<Result<Array<TChangeable>|ResultType>>{
        return this
            .database
            .select()
            .where('updatedAt', '<', date)
            .andWhere('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<Array<TChangeable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public last(order:Ordering = Ordering.Ascending): Promise<Result<TChangeable|ResultType>>{
        return this
            .database
            .first()
            .orderBy('updatedAt', order)
            .where('active', true)
            .then(result => 
                result.length > 0 
                    ?new Result<TChangeable>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public first(order:Ordering = Ordering.Ascending): Promise<Result<TChangeable|ResultType>>{
        return this
            .database
            .first()
            .orderBy('updatedAt', order)
            .where('active', true)
            .then(result => 
                result.length > 0 
                    ?new Result<TChangeable>(200, this.factory.build(result[0]))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public list(order = Ordering.Ascending): Promise<Result<Array<TChangeable>|ResultType>>{
        return this
            .database
            .select()
            .where('active', true)
            .orderBy('updatedAt', order)
            .then(result => 
                new Result<Array<TChangeable>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}