import express from "express";
import { getJoke } from "../controllers/jokeControllers";
import { verifyToken } from "../middleware/authorizeUser";
const router = express.Router();

router.get("/", verifyToken, getJoke);

module.exports = router;
