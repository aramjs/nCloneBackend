import { Request, Response } from "express";
import { links } from "../constants/links";
import { promise } from "../utils";

export const createLink = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const link = req.body as ILink;

    await promise([...links, link]);

    res.status(201).json(link);
  } catch (error: unknown) {
    // Type assertion for error
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await promise(links);
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};

export const getLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const link = links.find((link) => link.id === req.params.id);

    if (link) {
      res.json(link);
    } else {
      res.status(404).json({ message: "Link not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Internal Error" });
  }
};
