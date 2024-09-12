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
};

export default TaskController;
