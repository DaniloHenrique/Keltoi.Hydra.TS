import { ResultType } from "../../../core";

export interface ILinkingRepository<TAbscissa,TOrdinate> {
    listAbscissaByOrdinate(ordinate: TOrdinate): Promise<Array<TAbscissa>|ResultType>;
    listOrdinateByAbscissa(abscissa: TAbscissa): Promise<Array<TOrdinate>|ResultType>;
}