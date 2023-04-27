import { Router } from "express";
import { statusController } from "../controllers/index.js";

const router = Router();

router.get("/", statusController.getAll);

export default router;
