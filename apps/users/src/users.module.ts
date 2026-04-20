import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetUserHandler } from './queries/handlers/get-user-handler';
import { GetUsersHandler } from './queries/handlers/get-users-handler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
    }),
    CqrsModule.forRoot(),
  ],
  providers: [
    UsersResolver,
    CreateUserHandler,
    GetUsersHandler,
    GetUserHandler,
  ],
})
export class UsersModule {}
