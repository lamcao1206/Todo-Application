import Task from "../model/task.model.js";

const TaskController = {
  getIndexPage: async (req, res) => {
    try {
      const tasks = await Task.find();
      console.log(tasks);
      res.render("index", { tasks: tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.render("index", { tasks: [] });
    }
  },
  addTask: async (req, res) => {
    try {
      const { description } = req.body;
      const newTask = new Task({ description });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).send("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      task.completed = true;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      console.error("Error marking task as complete:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default TaskController;
