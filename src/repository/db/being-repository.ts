import type { IBeing, IEntityFactory} from '../../core';
import { Result, ResultType } from '../../core';
import type { IDbContext } from '../../context/db';
import { DbRepository } from './db-repository';


export class BeingRepository<TKey> extends DbRepository<TKey, IBeing<TKey>> {
    constructor(
        public readonly factory: IEntityFactory<TKey, IBeing<TKey>>, 
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    public getByDescription(description: string): Promise<Result<IBeing<TKey>|ResultType>>{
        return this
            .database
            .first()
            .where({description})
            .then(result => 
                result.length > 0 
                    ?new Result<IBeing<TKey>>(200, this.factory.build(result[0].toJSON()))
                    :new Result<ResultType>(404, ResultType.NotFound, 'Not Found')
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}