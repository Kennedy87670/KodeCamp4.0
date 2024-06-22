const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

router
  .route("/")
  .post(taskController.addNewTask)
  .get(taskController.getAllTask);

router
  .route("/:id")
  .get(taskController.getTaskbyId)
  .put(taskController.updateTask)
  .patch(taskController.changeStatus)
  .delete(taskController.deleteTask);

module.exports = router;
