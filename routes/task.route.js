import express from "express";
import TaskController from "../controller/task.controller.js";

const router = express.Router();

router.get("/", TaskController.getIndexPage);
router.post("/tasks", TaskController.addTask);

export default router;
