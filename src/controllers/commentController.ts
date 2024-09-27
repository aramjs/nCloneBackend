import { Request, Response } from "express";
import { comments, links, votes } from "../mockDB";
import { getPaginatedData, promise } from "../utils";
import { faker } from "@faker-js/faker";

export const createComment = async (
  req: Request<
    unknown,
    unknown,
    Pick<IComment, "linkId" | "parentId" | "text">
  >,
  res: Response
): Promise<void> => {
  try {
    const { linkId, parentId, text } = req.body;
    const isValid = text && (!!parentId || !!linkId);

    if (!isValid) {
      res.status(400).json({ error: "linkId/parentId/text are required" });
      return;
    }

    const newComment: IComment = {
      id: faker.database.mongodbObjectId(),
      author: { id: faker.database.mongodbObjectId(), username: req.username! },
      createdAt: new Date().toISOString(),
      linkId,
      parentId,
      text,
      commentCount: 0,
      votesCount: 0,
      userVote: null,
    };

    comments.unshift(newComment);

    await promise(null);

    res.status(201).json(newComment);
  } catch (error: unknown) {
    // Type assertion for error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const linkId = req.query.linkId === "null" ? null : req.query.linkId;
    const parentId = req.query.parentId === "null" ? null : req.query.parentId;

    const data = comments
      .filter((c) => c.linkId === linkId && c.parentId === parentId)
      .map((comment) => {
        const commentVotes = votes.filter((v) => v.commentId === comment.id);
        const replies = comments.filter((c) => c.parentId === comment.id);

        return {
          ...comment,
          commentCount: replies.length,
          votesCount: commentVotes.length,
          userVote: commentVotes.find(
            (v) => v.author.username === req.username
          ),
        };
      });
    const result = await promise(getPaginatedData(req, data));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const getComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const comment = comments.find((comment) => comment.id === req.params.id);

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
