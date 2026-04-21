import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from '../get-post.query';
import { Post } from '../../entities/post.entity';
import { postsMock } from '../../postsMock';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  async execute(query: GetPostQuery): Promise<Post | null> {
    const { postId } = query;
    return postsMock.find((post) => post.id === postId) || null;
  }
}
