import { CreatePostInput } from '../dto/create-post.input';

export class CreatePostCommand {
  constructor(public readonly data: CreatePostInput) {}
}
