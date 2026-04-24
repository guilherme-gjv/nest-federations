import { mikroOrmAdapter } from 'better-auth-mikro-orm';
import { betterAuth } from 'better-auth';
import { MikroORM } from '@mikro-orm/core';

export function createAuth(orm: MikroORM) {
  return betterAuth({
    database: mikroOrmAdapter(orm),
    advanced: {
      database: {
        generateId: false,
      },
    },
  });
}
