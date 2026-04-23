export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly authorId: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
