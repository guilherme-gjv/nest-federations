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
import { PostsByUserLoader } from './loaders/posts-by-user.loader';
import { UserPostsResolver } from './user-posts.resolver';
import { GetPostsByUserIdHandler } from './queries/handlers/get-posts-by-user-id.handler';
import { GetPostsByUserIdsHandler } from './queries/handlers/get-posts-by-user-ids.handler';

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
    PostsByUserLoader,
    UserPostsResolver,
    GetPostsByUserIdHandler,
    GetPostsByUserIdsHandler,
  ],
})
export class PostsModule {}
