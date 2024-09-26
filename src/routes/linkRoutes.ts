import express from "express";
import {
  getLinks,
  createLink,
  getLink,
  //   updateLink,
  //   deleteLink,
} from "../controllers";

const router = express.Router();

router.post("/", createLink);

router.get("/", getLinks);

router.get("/:id", getLink);

// router.put("/:id", updateLink);

// router.delete("/:id", deleteLink);

export default router;
