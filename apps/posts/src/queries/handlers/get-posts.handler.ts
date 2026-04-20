import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostsQuery } from '../get-posts.query';
import { Post } from '../../entities/post.entity';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  async execute(): Promise<Post[]> {
    // lógica de leitura aqui (ex: listar)
    return [
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
        authorId: '1',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
      {
        id: '2',
        title: 'Post 2',
        content: 'Content 2',
        authorId: '2',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
    ];
  }
}
