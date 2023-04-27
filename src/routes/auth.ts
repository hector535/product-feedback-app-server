import { Router } from "express";
import { authController } from "../controllers/index.js";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/forgot-password", authController.forgot);
router.post("/reset-password", authController.reset);
router.post("/activate-email", authController.activate);

export default router;
