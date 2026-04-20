import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

const data = [
  {
    id: '1',
    name: 'John Doe',
    email: 'email@email.com',
    password: 'password',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'email@email.com',
    password: 'password',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
  {
    id: '3',
    name: 'Peter Doe',
    email: 'peter@email.com',
    password: 'password',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
] as User[];

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    const input = {
      id: (data.length + 1).toString(),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      ...createUserInput,
    } as User;
    data.push(input);
    return createUserInput;
  }

  findAll() {
    return data;
  }

  findOne(id: string) {
    return data.find((user) => user.id === id);
  }
}
