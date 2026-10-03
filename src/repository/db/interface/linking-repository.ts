import { ResultType, Result } from "../../../core";

export interface ILinkingRepository<TAbscissa,TOrdinate> {
    listAbscissaByOrdinate(ordinate: TOrdinate): Promise<Result<Array<TAbscissa>|ResultType>>;
    listOrdinateByAbscissa(abscissa: TAbscissa): Promise<Result<Array<TOrdinate>|ResultType>>;
}