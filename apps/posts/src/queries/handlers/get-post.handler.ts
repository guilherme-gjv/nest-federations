import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from '../get-post.query';
import { Post } from '../../entities/post.entity';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  async execute(query: GetPostQuery): Promise<Post> {
    const { postId } = query;
    // lógica de leitura aqui (ex: buscar no banco)
    return {
      id: postId,
      title: 'Post 1',
      content: 'Content 1',
      authorId: '1',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
  }
}
