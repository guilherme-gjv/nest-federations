import { defineEntity, InferEntity, p } from '@mikro-orm/core';
import { User } from './user.entity';

export const AccountSchema = defineEntity({
  name: 'Account',
  tableName: 'account',
  properties: {
    id: p.string().primary(),
    accountId: p.string(),
    providerId: p.string(),
    accessToken: p.string().nullable(),
    refreshToken: p.string().nullable(),
    accessTokenExpiresAt: p.datetime().nullable(),
    refreshTokenExpiresAt: p.datetime().nullable(),
    scope: p.string().nullable(),
    idToken: p.string().nullable(),
    password: p.string().nullable(),
    user: () => p.manyToOne(User),
  },
});

export type IAccount = InferEntity<typeof AccountSchema>;

export class Account extends AccountSchema.class {}
AccountSchema.setClass(Account);
