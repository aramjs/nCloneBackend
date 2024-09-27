type IComment = {
  id: string;
  text: string;
  author: IAuthor;
  createdAt: string;
  linkId: string;
  parentId: string | null;
  commentCount?: number;
  votesCount?: number;
  userVote?: IVote | null;
};
