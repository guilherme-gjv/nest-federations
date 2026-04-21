import {
  Resolver,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { PostsByUserLoader } from './loaders/posts-by-user.loader';

@Resolver('User')
export class UserPostsResolver {
  constructor(private readonly postsByUserLoader: PostsByUserLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return { id: reference.id };
  }

  @ResolveField('posts')
  getPosts(@Parent() user: { id: string }) {
    return this.postsByUserLoader.load(user.id);
  }
}
