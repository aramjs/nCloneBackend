type IVote = {
  id: string;
  author: IAuthor;
  linkId: string | null;
  commentId: string | null;
  type: "up" | "down";
};
