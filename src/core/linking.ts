import type { IEntity } from './entity';
import type { IKeyLinking } from './key-linking';

export interface ILinking<
    TKeyAbsicssa, 
    TAbsicssa extends IEntity<TKeyAbsicssa>,
    TKeyOrdinate,
    TOrdinate extends IEntity<TKeyOrdinate>
> extends IEntity<IKeyLinking<TKeyAbsicssa, TKeyOrdinate>> {
    readonly abscissa: TAbsicssa;
    readonly ordinate: TOrdinate;
}

