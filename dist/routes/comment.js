import { Router } from "express";
import { commentController } from "../controllers/index.js";
const router = Router();
router.post("/", commentController.add);
router.put("/:id", commentController.edit);
router.delete("/:id", commentController.remove);
export default router;
