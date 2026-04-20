import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserQuery } from './queries/get-user.query';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.commandBus.execute(new CreateUserCommand(createUserInput));
  }

  @Query('users')
  findAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }
}
