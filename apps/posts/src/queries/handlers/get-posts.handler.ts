import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../get-posts.query';
import { Post } from '../../entities/post.entity';
import { postsMock } from '../../../postsMock';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  async execute(): Promise<Post[]> {
    return postsMock;
  }
}
