import { defineEntity, InferEntity, p } from '@mikro-orm/core';

export const VerificationSchema = defineEntity({
  name: 'Verification',
  tableName: 'verification',
  properties: {
    id: p.string().primary(),
    identifier: p.string(),
    value: p.string(),
    expiresAt: p.datetime(),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime().onUpdate(() => new Date()),
  },
});

export type IVerification = InferEntity<typeof VerificationSchema>;

export class Verification extends VerificationSchema.class {}
VerificationSchema.setClass(Verification);
