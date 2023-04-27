import { Router } from "express";
import { categoryController } from "../controllers/index.js";

const router = Router();

router.get("/", categoryController.getAll);

export default router;
