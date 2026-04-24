import { defineEntity, p } from '@mikro-orm/core';

const UserSchema = defineEntity({
  name: 'User',
  tableName: 'user',
  properties: {
    id: p.string().primary(),
    name: p.string(),
    email: p.string().unique(),
    emailVerified: p.boolean(),
    image: p.string().nullable(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onUpdate(() => new Date()),
  },
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);
