import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  async execute(command: CreatePostCommand) {
    const { data } = command;
    const savedData = {
      id: 1,
      ...data,
    };
    return savedData.id;
  }
}
