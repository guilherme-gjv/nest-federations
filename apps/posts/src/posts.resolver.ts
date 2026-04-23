import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreatePostInput } from './dto/create-post.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';
import { GetPostsQuery } from './queries/get-posts.query';
import { GetPostQuery } from './queries/get-post.query';
import { Post } from './entities/post.entity';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation('createPost')
  create(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.commandBus.execute(new CreatePostCommand(createPostInput));
  }

  @Query('posts')
  findAll() {
    return this.queryBus.execute(new GetPostsQuery());
  }

  @Query('post')
  findOne(@Args('id') id: string) {
    return this.queryBus.execute(new GetPostQuery(id));
  }

  @ResolveField('author')
  getUser(@Parent() post: Post) {
    return { __typename: 'User', id: post.authorId };
  }
}
