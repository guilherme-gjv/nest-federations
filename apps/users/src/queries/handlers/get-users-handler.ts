import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../get-users.query';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  async execute(): Promise<User[]> {
    // lógica de leitura aqui (ex: listar)
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@email.com',
        password: '123',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
    ];
  }
}
