import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetPostsByUserIdsQuery } from '../queries/get-posts-by-user-ids.query';

@Injectable({ scope: Scope.REQUEST })
export class PostsByUserLoader {
  private readonly loader: DataLoader<string, Post[]>;

  constructor(private readonly queryBus: QueryBus) {
    this.loader = new DataLoader<string, Post[]>(
      async (userIds: readonly string[]) => {
        const posts = await this.queryBus.execute<
          GetPostsByUserIdsQuery,
          Promise<Post[]>
        >(new GetPostsByUserIdsQuery(userIds as string[]));

        const postsByUserId = new Map<string, Post[]>();

        for (const userId of userIds) {
          postsByUserId.set(userId, []);
        }

        for (const post of posts) {
          const existing = postsByUserId.get(post.authorId) ?? [];
          existing.push(post);
          postsByUserId.set(post.authorId, existing);
        }

        return userIds.map((id) => postsByUserId.get(id) ?? []);
      },
    );
  }

  load(userId: string): Promise<Post[]> {
    return this.loader.load(userId);
  }
}
