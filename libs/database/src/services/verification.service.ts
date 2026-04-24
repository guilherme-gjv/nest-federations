import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Verification } from '../entities/verification.entity';
import { VerificationRepository } from '../repositories/verification.repository';

@Injectable()
export class VerificationService {
  constructor(
    private readonly verificationRepository: VerificationRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return this.verificationRepository.findAll();
  }

  async findOne(id: string) {
    return this.verificationRepository.findOneOrFail(id);
  }

  async create(data: RequiredEntityData<Verification>) {
    const verification = this.verificationRepository.create(data);
    await this.em.persist(verification).flush();
    return verification;
  }

  async update(id: string, data: EntityData<Verification>) {
    const verification = await this.findOne(id);
    this.verificationRepository.assign(verification, data);
    await this.em.flush();
    return verification;
  }

  async remove(id: string) {
    const verification = await this.findOne(id);
    await this.em.remove(verification).flush();
    return true;
  }
}
