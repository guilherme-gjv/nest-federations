import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '../../.env') });

const baseConfig = {
  entities: [join(__dirname, '../**/*.entity.js')],
  entitiesTs: [join(__dirname, '../**/*.entity.ts')],
  debug: true,
  dynamicImportProvider: (id: string) => import(id),
  extensions: [Migrator],
  migrations: {
    path: join(__dirname, 'migrations'),
    pathTs: join(__dirname, 'migrations'),
  },
};

export const getMikroOrmConfig = (
  config: ConfigService,
): MikroOrmModuleOptions => ({
  ...baseConfig,
  host: config.get<string>('DATABASE_HOST'),
  port: Number(config.get<number>('DATABASE_PORT')),
  user: config.get<string>('DATABASE_USER'),
  password: config.get<string>('DATABASE_PASSWORD'),
  dbName: config.get<string>('DATABASE_NAME'),
});

export default {
  ...baseConfig,
  driver: PostgreSqlDriver,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
} as MikroOrmModuleOptions;
