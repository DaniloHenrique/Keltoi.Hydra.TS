import type { IEntity, ILinking, IEntityFactory } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class LinkingRepository<
    TKeyAbscissa, 
    TAbscissa extends IEntity<TKeyAbscissa>,
    TKeyOrdinate,
    TOrdinate extends IEntity<TKeyOrdinate>
> extends DbRepository<
    {idAbscissa:TKeyAbscissa, idOrdinate:TKeyOrdinate}, 
    ILinking<TKeyAbscissa, TAbscissa, TKeyOrdinate, TOrdinate>
> {

    constructor(
        public readonly factory: IEntityFactory<
            {idAbscissa:TKeyAbscissa, idOrdinate:TKeyOrdinate}, 
            ILinking<TKeyAbscissa, TAbscissa, TKeyOrdinate, TOrdinate>
        >, 
        public readonly abscissaFactory: IEntityFactory<TKeyAbscissa, TAbscissa>,
        public readonly ordinateFactory: IEntityFactory<TKeyOrdinate, TOrdinate>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    listAbscissaByOrdinate(ordinate: TOrdinate): Promise<Result<TAbscissa[]|ResultType>>{
        return this
            .database
            .select()
            .where(ordinate.toKey())
            .then(result => 
                new Result<TAbscissa[]>(200, result.map(this.abscissaFactory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    listOrdinateByAbscissa(abscissa: TAbscissa): Promise<Result<TOrdinate[]|ResultType>>{
        return this
            .database
            .select()
            .where(abscissa.toKey())
            .then(result => 
                new Result<TOrdinate[]>(200, result.map(this.ordinateFactory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}