import express from "express";
import { registerUser, login } from "../controllers/userControllers";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
