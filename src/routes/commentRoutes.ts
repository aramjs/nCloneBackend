import express from "express";
import { getComments, createComment, getComment } from "../controllers";

const router = express.Router();

router.post("/", createComment);

router.get("/", getComments);

router.get("/:id", getComment);

export default router;
