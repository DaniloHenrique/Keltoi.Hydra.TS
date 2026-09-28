import type { IEntity, ILinking, IEntityFactory, IModel, IKeyLinking } from '../../core';
import type { IDbContext } from '../../context/db';

import { Result, ResultType } from '../../core';
import { DbRepository } from './db-repository';

export class LinkingRepository<    
    TLinkingModel extends IModel,
    TKeyAbscissa, 
    TAbscissaModel extends IModel,
    TAbscissa extends IEntity<TKeyAbscissa,TAbscissaModel>,
    TKeyOrdinate,
    TOrdinateModel extends IModel,
    TOrdinate extends IEntity<TKeyOrdinate,TOrdinateModel>,
    TLinking extends ILinking<TLinkingModel, TKeyAbscissa, TAbscissaModel, TAbscissa, TKeyOrdinate, TOrdinateModel, TOrdinate>
> extends DbRepository<
    IKeyLinking<TKeyAbscissa, TKeyOrdinate>,
    TLinkingModel,
    TLinking
> {

    constructor(
        public readonly factory: IEntityFactory<
            IKeyLinking<TKeyAbscissa, TKeyOrdinate>,
            TLinkingModel,
            TLinking
        >, 
        public readonly abscissaFactory: IEntityFactory<TKeyAbscissa, TAbscissaModel, TAbscissa>,
        public readonly ordinateFactory: IEntityFactory<TKeyOrdinate, TOrdinateModel, TOrdinate>,
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