import type { IEntity } from './entity';
import type { IKeyLinking } from './key-linking';
import type { IModel } from './model';

export interface ILinking<
    TLinkingModel extends IModel,
    TKeyAbsicssa, 
    TAbscissaModel extends IModel,
    TAbsicssa extends IEntity<TKeyAbsicssa,TAbscissaModel>,
    TKeyOrdinate,
    TOrdinateModel extends IModel,
    TOrdinate extends IEntity<TKeyOrdinate,TOrdinateModel>
> extends IEntity<IKeyLinking<TKeyAbsicssa, TKeyOrdinate>, TLinkingModel> {
    readonly abscissa: TAbsicssa;
    readonly ordinate: TOrdinate;
}

