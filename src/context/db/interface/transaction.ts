import { Knex } from "knex";

export interface IDbTransaction {
    readonly transaction: Knex.Transaction<any, any[]>;
}