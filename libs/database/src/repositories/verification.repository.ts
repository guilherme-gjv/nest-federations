import { EntityRepository } from '@mikro-orm/postgresql';
import { Verification } from '../entities/verification.entity';

export class VerificationRepository extends EntityRepository<Verification> {}
