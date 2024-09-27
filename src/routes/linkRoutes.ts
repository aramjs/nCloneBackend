import express from "express";
import { getLinks, createLink, getLink } from "../controllers";

const router = express.Router();

router.post("/", createLink);

router.get("/", getLinks);

router.get("/:id", getLink);

export default router;
