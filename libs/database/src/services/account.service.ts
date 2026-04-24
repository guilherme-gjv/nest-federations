import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return this.accountRepository.findAll();
  }

  async findOne(id: string) {
    return this.accountRepository.findOneOrFail(id);
  }

  async create(data: RequiredEntityData<Account>) {
    const account = this.accountRepository.create(data);
    await this.em.persist(account).flush();
    return account;
  }

  async update(id: string, data: EntityData<Account>) {
    const account = await this.findOne(id);
    this.accountRepository.assign(account, data);
    await this.em.flush();
    return account;
  }

  async remove(id: string) {
    const account = await this.findOne(id);
    await this.em.remove(account).flush();
    return true;
  }
}
