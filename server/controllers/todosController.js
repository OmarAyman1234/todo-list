const Todo = require("../model/Todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ isDeleted: { $ne: true } }).exec();
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
    const userId = 1;

    if (!todoName)
      return res.status(400).json({ message: "todoname can't be empty!" });

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
    const { newName } = req.body;
    const todoId = req.params.id;

    if (!newName)
      return res.status(400).json({ message: "Todo name can't be empty" });

    const todoToRename = await Todo.findOne({ _id: todoId }).exec();
    if (!todoToRename)
      return res
        .status(404)
        .json({ message: `Todo with ID ${todoId} not found` });

    const oldTodoName = todoToRename.name;

    if (oldTodoName === newName) return res.sendStatus(204);

    todoToRename.name = newName;
    todoToRename.lastEditedAt = new Date();
    await todoToRename.save();

    return res
      .status(200)
      .json({ message: `Changed ${oldTodoName} to ${todoToRename.name}` });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const completeTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    if (!todoId)
      return res.status(400).json({ message: "Todo ID was not provided." });

    if (todoId.startsWith("["))
      return res.status(400).json({
        message: "Todo ID was not provided correctly.",
      });

    const todoToComplete = await Todo.findOne({ _id: todoId }).exec();
    if (!todoToComplete)
      return res.status(404).json({ message: "Todo was not found." });

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

    const todoToDelete = await Todo.findOne({ _id: todoId }).exec();

    if (!todoToDelete) return res.sendStatus(404);

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
