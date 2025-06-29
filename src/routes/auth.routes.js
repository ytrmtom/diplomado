import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

// Routes
router.post("/", authController.login);

export default router;