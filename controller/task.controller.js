import Task from "../model/task.model.js";

const TaskController = {
  getIndexPage: async (req, res) => {
    try {
      const tasks = await Task.find();
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
};

export default TaskController;
