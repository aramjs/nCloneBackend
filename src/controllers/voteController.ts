import { faker } from "@faker-js/faker";
import { Request, Response } from "express";
import { votes } from "../mockDB";
import { promise } from "../utils";

export const createVote = async (
  req: Request<unknown, unknown, Pick<IVote, "type" | "linkId" | "commentId">>,
  res: Response
): Promise<void> => {
  try {
    const { type, linkId = null, commentId = null } = req.body;

    if (!linkId && !commentId) {
      res.status(400).json({ error: "linkId or commentId is required" });
      return;
    }

    const indexToRemove = votes.findIndex((v) => {
      const isSameUser = v.author.username === req.username;

      if (linkId) return isSameUser && v.linkId === linkId;
      if (commentId) return isSameUser && v.commentId === commentId;

      return false;
    });

    if (indexToRemove > -1) {
      votes.splice(indexToRemove, 1);
    }

    if (!type) {
      res.status(201).json({});
      return;
    }

    const newVote: IVote = {
      id: faker.database.mongodbObjectId(),
      author: {
        id: faker.database.mongodbObjectId(),
        username: req.username!,
      },
      linkId,
      commentId,
      type,
    };

    votes.unshift(newVote);

    await promise(null);

    res.status(201).json(newVote);
  } catch (error: unknown) {
    // Type assertion for error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
