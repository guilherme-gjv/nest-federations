import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { User } from '../../entities/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  async execute(query: GetUserQuery): Promise<Omit<User, 'password'>> {
    const { userId } = query;
    // lógica de leitura aqui (ex: buscar no banco)
    return {
      id: userId,
      name: 'John Doe',
      email: 'john@email.com',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
  }
}
