import "reflect-metadata";
import { DataSource } from "typeorm";
import { Resource } from "./entity/resource";
import dotenv from "dotenv";
dotenv.config();

function toBool(v: any, def=false) {
  if (v === undefined) return def;
  const s = String(v).toLowerCase();
  return s === "1" || s === "true" || s === "yes";
}

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Resource],
  options: {
    encrypt: toBool(process.env.DB_ENCRYPT, false),
    trustServerCertificate: toBool(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
  },
});
