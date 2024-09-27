import express from "express";
import { getLinks, createLink, getLink, updateLink } from "../controllers";

const router = express.Router();

router.post("/", createLink);
router.put("/:id", updateLink);

router.get("/", getLinks);

router.get("/:id", getLink);

export default router;
