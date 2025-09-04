import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './components/authen/model/user';

dotenv.config();

function toBool(value: unknown, defaultValue = false): boolean {
  if (value === undefined || value === null) return defaultValue;
  const str = String(value).trim().toLowerCase();
  return ['1', 'true', 'yes'].includes(str);
}

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  options: {
    encrypt: toBool(process.env.DB_ENCRYPT, false),
    trustServerCertificate: toBool(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
  },
});