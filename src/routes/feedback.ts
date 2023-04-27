import { Router } from "express";
import { feedbackController } from "../controllers/index.js";

const router = Router();

router.get("/", feedbackController.getAll);
router.get("/status", feedbackController.countByStatus);
router.get("/:id", feedbackController.getByIdForPreview);
router.get("/:id/edit", feedbackController.getByIdForEdit);
router.get("/:id/comments/:commentId?", feedbackController.getComments);
router.post("/", feedbackController.add);
router.post("/:id/upvote", feedbackController.upvote);
router.put("/:id", feedbackController.edit);
router.delete("/:id", feedbackController.remove);

export default router;
