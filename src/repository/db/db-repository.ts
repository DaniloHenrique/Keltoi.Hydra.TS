import type { IEntity, IEntityFactory } from '../../core';
import type { IDbRepository} from './interface';
import type { IDbContext, IDbTransaction } from '../../context/db';


import { Knex } from "knex";
import { Result, ResultType} from '../../core';


export abstract class DbRepository<TKey,TEntity extends IEntity<TKey>> implements IDbRepository<TEntity> {
    protected _transactionContext: IDbTransaction|null = null;

    constructor(
        public readonly factory: IEntityFactory<TKey,TEntity>,
        protected readonly context: IDbContext
    ) {}

    set transaction(transactionContext: IDbTransaction) {
        this._transactionContext = transactionContext;
    }

    get database(): Knex.QueryBuilder{
        const tableName = this.factory.tableName;

        return this._transactionContext?.transaction(tableName) ?? this.context.db(tableName);
    }

    public insert(entity: TEntity): Promise<Result<ResultType>>{
        return  this
            .database
            .insert({   
                ...entity.toKey(), 
                ...entity.toData()
            })
            .then(result => 
                result.length > 0 
                    ?new Result<ResultType>(201, ResultType.Created)
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            ).catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public create(entity: TEntity): Promise<Result<TEntity|ResultType>>{
        return this
            .database
            .insert(
                {...entity.toData()},
                Object.keys(entity.toKey())
            )
            .then(ids => 
                ids.length > 0 
                    ?new Result<TEntity>(201, this.factory
                        .build({
                            ...ids[0],
                            ...entity.toData()
                        })
                    )
                    :new Result<ResultType>(400, ResultType.BadRequest, 'Bad Request')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public get(entity: TEntity): Promise<Result<TEntity|ResultType>>{
        return this
            .database
            .first()
            .where(entity.toKey())
            .then(result => 
                !!result 
                    ?new Result<TEntity>(200, this.factory.build(result))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    public update(entity: TEntity): Promise<Result<ResultType>>{
        return this
            .database
            .update(entity.toData())
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

    public delete(entity: TEntity): Promise<Result<ResultType>>{
        return this
            .database
            .delete()
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

    public list(): Promise<Result<Array<TEntity>|ResultType>>{
        return this
            .database
            .select()
            .then(result => 
                new Result<Array<TEntity>>(200, result.map(this.factory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}
