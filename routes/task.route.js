import express from "express";
import TaskController from "../controller/task.controller.js";

const router = express.Router();

router.get("/", TaskController.getIndexPage);
router.post("/tasks", TaskController.addTask);
router.delete("/tasks/:id", TaskController.deleteTask);
router.patch("/tasks/:id/complete", TaskController.updateTask);

export default router;
