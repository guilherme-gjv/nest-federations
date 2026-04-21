import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { User } from '../../entities/user.entity';
import { usersMock } from '../../usersMock';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  async execute(query: GetUserQuery): Promise<Omit<User, 'password'> | null> {
    const { userId } = query;
    return usersMock.find((user) => user.id === userId) || null;
  }
}
