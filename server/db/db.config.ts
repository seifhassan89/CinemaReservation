import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

const dbtype = (process.env.DB_TYPE || 'mysql') as 'mysql' | 'postgres';

const extraSSL =
  process.env.DB_SSL === 'true' ? { ssl: { rejectUnauthorized: false } } : {};

export const dataSourceOptions: DataSourceOptions = {
  type: dbtype,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true',
  extra: extraSSL,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.DB_SYNC === 'true',
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
