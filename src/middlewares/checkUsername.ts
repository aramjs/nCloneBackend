import { Request, Response, NextFunction } from "express";

export const checkUsername = (
  req: Request,
  res: Response,
  next: NextFunction
): ReturnType<NextFunction> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(400)
      .json({ error: "Authorization header with Bearer token is required" });
    return;
  }

  const [, username] = authHeader.split(" ");

  if (!username) {
    res
      .status(400)
      .json({ error: "Username is required in the Authorization header" });
    return;
  }

  // Attach the username to the request object for later use
  req.username = username;
  next();
};
