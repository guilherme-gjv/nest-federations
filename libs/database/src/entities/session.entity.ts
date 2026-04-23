import { defineEntity, p } from '@mikro-orm/core';
import { User } from './user.entity';

const SessionSchema = defineEntity({
  name: 'Session',
  tableName: 'session',
  properties: {
    id: p.string().primary(),
    token: p.string().unique(),
    expiresAt: p.datetime(),
    ipAddress: p.string().nullable(),
    userAgent: p.string().nullable(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onUpdate(() => new Date()),
    user: () => p.manyToOne(User),
  },
});

export class Session extends SessionSchema.class {}
SessionSchema.setClass(Session);
