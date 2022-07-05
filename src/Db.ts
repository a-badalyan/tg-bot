import { IMain, IDatabase } from "pg-promise";
import pgPromise from "pg-promise";

const pgp: IMain = pgPromise({
  query(e: any) {
    console.log("QUERY RESULT:", e.query);
  },
  receive(data: any, result: any, e: any) {
    console.log(`DATA FROM QUERY ${e.query} WAS RECEIVED.`);
  },
});

const connection = {
  host: "localhost",
  port: 5432,
  database: "telegram",
  user: "artem",
  password: "12345",
  max: 30, // use up to 30 connections

  // "types" - in case you want to set custom type parsers on the pool level
};

const db: IDatabase<any> = pgp(connection);

export { db };
