const tasks = [];
const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

// Add a new Task
exports.addNewTask = expressAsyncHandler((req, res) => {
  const { title, body, status } = req.body;
  const newTask = {
    id: uuidv4(),
    title,
    body,
    status,
  };
  tasks.push(newTask);

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
});

// Get all tasks
exports.getAllTask = expressAsyncHandler((req, res) => {
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

// Get task by Id
exports.getTaskbyId = expressAsyncHandler((req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === id);
  if (task) {
    res.status(200).json({
      status: "success",
      data: { task },
    });
  } else {
    res.status(404).json({
      status: "Not Found",
    });
  }
});

// Update task
exports.updateTask = expressAsyncHandler((req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].title = title;
    tasks[taskIndex].body = body;
    res.status(200).json({
      status: "success",
      data: { task: tasks[taskIndex] },
    });
  } else {
    res.status(404).json({
      status: "Not Found",
    });
  }
});

// // Change task status
// exports.changeStatus = expressAsyncHandler((req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const taskIndex = tasks.findIndex((task) => task.id === id);
//   if (taskIndex !== -1) {
//     tasks[taskIndex].status = status;
//     res.status(200).json({
//       status: "success",
//       data: { task: tasks[taskIndex] },
//     });
//   } else {
//     res.status(404).json({
//       status: "Task Not Found",
//     });
//   }
// });

// Function to change task status
exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Find the task by ID
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      status: "failed",
      message: "Task not found",
    });
  }

  // Update the task's status
  task.status = status;

  return res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

// Delete task
exports.deleteTask = expressAsyncHandler((req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(404).json({
      status: "Task Not Found",
    });
  }
});
