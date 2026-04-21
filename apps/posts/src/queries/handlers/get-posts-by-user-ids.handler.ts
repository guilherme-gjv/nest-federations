import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsByUserIdsQuery } from '../get-posts-by-user-ids.query';
import { Post } from '../../entities/post.entity';
import { postsMock } from '../../../postsMock';

@QueryHandler(GetPostsByUserIdsQuery)
export class GetPostsByUserIdsHandler
  implements IQueryHandler<GetPostsByUserIdsQuery>
{
  async execute(query: GetPostsByUserIdsQuery): Promise<Post[]> {
    const { userIds } = query;

    return postsMock.filter((post) => userIds.includes(post.authorId));
  }
}
