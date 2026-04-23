import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../get-users.query';
import { User } from '../../entities/user.entity';
import { usersMock } from '../../usersMock';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  async execute(): Promise<User[]> {
    return usersMock;
  }
}
