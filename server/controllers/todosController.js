const Todo = require("../model/Todo");
const strToObjectId = require("../utils/strToObject");
const mongoose = require("mongoose");

const getAllTodos = async (req, res) => {
  try {
    const userId = strToObjectId(req.userId);
    if (!userId) return res.sendStatus(400);

    const todos = await Todo.find({
      isDeleted: { $ne: true },
      userId: userId,
    }).exec();

    if (!todos || todos.length === 0) return res.sendStatus(204);
    else return res.json(todos);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const createTodo = async (req, res) => {
  try {
    const todoName = req.body.todoName;
    const userId = strToObjectId(req.userId);

    if (!todoName)
      return res.status(400).json({ message: "todoname can't be empty!" });

    if (!userId) return res.sendStatus(400);

    const newTodo = await Todo.create({
      userId: userId,
      name: todoName,
    });

    return res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const renameTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { newName } = req.body;

    if (!todoId || !mongoose.isValidObjectId(todoId))
      return res.sendStatus(400);

    if (!newName)
      return res.status(400).json({ message: "Todo name cannot be empty!" });

    const todoToRename = await Todo.findOne({ _id: todoId }).exec();
    if (!todoToRename)
      return res.status(404).json({ message: `Todo not found.` });

    const userId = strToObjectId(req.userId);
    if (!userId) return res.sendStatus(400);

    if (!todoToRename.userId.equals(userId))
      return res
        .status(401)
        .json({ message: "You are unauthorized for this operation." });

    const oldTodoName = todoToRename.name;
    if (oldTodoName === newName) return res.sendStatus(204);

    todoToRename.name = newName;
    todoToRename.lastEditedAt = new Date();
    await todoToRename.save();

    return res
      .status(200)
      .json({ message: `Changed [${oldTodoName}] to [${todoToRename.name}].` });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const completeTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    if (!todoId || !mongoose.isValidObjectId(todoId))
      return res.sendStatus(400);

    const todoToComplete = await Todo.findOne({ _id: todoId }).exec();
    if (!todoToComplete)
      return res.status(404).json({ message: "Todo was not found." });

    const userId = strToObjectId(req.userId);
    if (!userId) return res.sendStatus(400);

    if (!todoToComplete.userId.equals(userId))
      return res
        .status(401)
        .json({ message: "You are unauthorized for this operation." });

    todoToComplete.isCompleted = true;
    todoToComplete.completedAt = new Date();
    await todoToComplete.save();

    return res.json(todoToComplete);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    if (!todoId || !mongoose.isValidObjectId(todoId))
      return res.sendStatus(400);

    const todoToDelete = await Todo.findOne({ _id: todoId }).exec();

    if (!todoToDelete) return res.sendStatus(404);

    const userId = strToObjectId(req.userId);
    if (!userId) return res.sendStatus(400);

    if (!todoToDelete.userId.equals(userId))
      return res
        .status(401)
        .json({ message: "You are unauthorized for this operation." });

    todoToDelete.isDeleted = true;
    todoToDelete.deletedAt = Date.now();
    await todoToDelete.save();

    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  renameTodo,
  completeTodo,
  deleteTodo,
};
