import { Knex } from "knex";
import type { IDbTransaction } from "./interface/transaction";

export class TransactionContext implements IDbTransaction {
    constructor(public readonly transaction: Knex.Transaction<any, any[]>) {}
}