import tasks from "../data/tasks.js";

// GET all tasks
export const getAllTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};

// GET a single task
export const getTaskById = (req, res) => {
    const taskId = Number(req.params.id);

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json({
        success: true,
        data: task
    });
};

// CREATE a new task
export const createTask = (req, res) => {
    const { title, description } = req.body;

    // Validate required fields
    if (typeof title !== "string" || typeof description !== "string" || !title.trim() || !description.trim()) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required"
        });
    }

    // Create a new task
    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1,
        title: title.trim(),
        description: description.trim(),
        completed: false
    };

    // Store the new task
    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask
    });
};

// UPDATE an existing task
export const updateTask = (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, completed } = req.body;

  // Check whether the task exists
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  // Validate the required fields
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    !title.trim() ||
    !description.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Title and description must be valid text"
    });
  }

  // Validate completed if provided
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean"
    });
  }

  // Update the task
  task.title = title.trim();
  task.description = description.trim();

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
};

// DELETE an existing task
export const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  // Check whether the task exists
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  // Remove the task and keep a copy of it
  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask
  });
};