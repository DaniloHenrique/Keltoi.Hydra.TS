import type { IEntity, ILinking, IEntityFactory, IKeyLinking } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class LinkingRepository<    
    TKeyAbscissa, 
    TAbscissa extends IEntity<TKeyAbscissa>,
    TKeyOrdinate,
    TOrdinate extends IEntity<TKeyOrdinate>,
    TLinking extends ILinking<TKeyAbscissa, TAbscissa, TKeyOrdinate, TOrdinate>
> extends DbRepository<
    IKeyLinking<TKeyAbscissa, TKeyOrdinate>,
    TLinking
> {

    constructor(
        public readonly factory: IEntityFactory<IKeyLinking<TKeyAbscissa, TKeyOrdinate>,TLinking>, 
        public readonly abscissaFactory: IEntityFactory<TKeyAbscissa, TAbscissa>,
        public readonly ordinateFactory: IEntityFactory<TKeyOrdinate, TOrdinate>,
        protected readonly context: IDbContext
    ) {
        super(factory, context);
    }

    listAbscissaByOrdinate(ordinate: TOrdinate): Promise<Result<Array<TAbscissa>|ResultType>>{
        return this
            .database
            .select()
            .where(ordinate.toKey())
            .then(result => 
                new Result<Array<TAbscissa>>(200, result.map(this.abscissaFactory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }

    listOrdinateByAbscissa(abscissa: TAbscissa): Promise<Result<Array<TOrdinate>|ResultType>>{
        return this
            .database
            .select()
            .where(abscissa.toKey())
            .then(result => 
                new Result<Array<TOrdinate>>(200, result.map(this.ordinateFactory.build))
            )
            .catch(error => 
                new Result<ResultType>(500, ResultType.InternalServerError, error.message)
            )
    }
}