import { Knex } from "knex";
import { TransactionContext } from "./transaction-context";
import type { IDbContext } from "./interface";

export class DbContext implements IDbContext {
    constructor(public readonly db: Knex) {}

    async transaction(): Promise<TransactionContext> {
        return new TransactionContext(await this.db.transaction());
    }
}
