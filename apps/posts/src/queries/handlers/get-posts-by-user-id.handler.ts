import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsByUserIdQuery } from '../get-posts-by-user-id.query';
import { Post } from '../../entities/post.entity';
import { PostsByUserLoader } from '../../loaders/posts-by-user.loader';

@QueryHandler(GetPostsByUserIdQuery)
export class GetPostsByUserIdHandler
  implements IQueryHandler<GetPostsByUserIdQuery>
{
  constructor(private readonly postsByUserLoader: PostsByUserLoader) {}

  async execute(query: GetPostsByUserIdQuery): Promise<Post[]> {
    return this.postsByUserLoader.load(query.userId);
  }
}
