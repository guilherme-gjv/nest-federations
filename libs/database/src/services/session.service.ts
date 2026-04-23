import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Session } from '../entities/session.entity';
import { SessionRepository } from '../repositories/session.repository';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return this.sessionRepository.findAll();
  }

  async findOne(id: string) {
    return this.sessionRepository.findOneOrFail(id);
  }

  async create(data: RequiredEntityData<Session>) {
    const session = this.sessionRepository.create(data);
    await this.em.persist(session).flush();
    return session;
  }

  async update(id: string, data: EntityData<Session>) {
    const session = await this.findOne(id);
    this.sessionRepository.assign(session, data);
    await this.em.flush();
    return session;
  }

  async remove(id: string) {
    const session = await this.findOne(id);
    await this.em.remove(session).flush();
    return true;
  }
}
