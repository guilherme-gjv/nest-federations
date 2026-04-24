import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    return this.userRepository.findOneOrFail(id);
  }

  async create(data: RequiredEntityData<User>) {
    const user = this.userRepository.create(data);
    await this.em.persist(user).flush();
    return user;
  }

  async update(id: string, data: EntityData<User>) {
    const user = await this.findOne(id);
    this.userRepository.assign(user, data);
    await this.em.flush();
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.em.remove(user).flush();
    return true;
  }
}
