import { Knex } from "knex";

export interface IDbContext {
    readonly db: Knex;
}