import {
  Resolver,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostsByUserIdQuery } from './queries/get-posts-by-user-id.query';

@Resolver('User')
export class UserPostsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return { id: reference.id };
  }

  @ResolveField('posts')
  getPosts(@Parent() user: { id: string }) {
    return this.queryBus.execute(new GetPostsByUserIdQuery(user.id));
  }
}
