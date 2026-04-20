import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { GetPostHandler } from './queries/handlers/get-post.handler';
import { GetPostsHandler } from './queries/handlers/get-posts.handler';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['apps/posts/src/**/*.graphql'],
    }),
    CqrsModule.forRoot(),
  ],
  providers: [
    PostsResolver,
    CreatePostHandler,
    GetPostHandler,
    GetPostsHandler,
  ],
})
export class PostsModule {}
