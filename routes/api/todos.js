const express = require("express");
const router = express.Router();
const todosController = require("../../controllers/todosController");

router
  .route("/")
  .get(todosController.getAllTodos)
  .post(todosController.createTodo);

router
  .route("/:id")
  .put(todosController.updateTodo)
  .delete(todosController.deleteTodo);

module.exports = router;
