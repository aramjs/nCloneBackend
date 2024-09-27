import express from "express";
import { createVote } from "../controllers";

const router = express.Router();

router.post("/", createVote);

export default router;
