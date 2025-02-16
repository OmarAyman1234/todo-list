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

const updateTodo = async (req, res) => {
  try {
    const { todoName, isCompleted } = req.body;
    const todoId = req.params.id;

    if (!todoName)
      return res.status(400).json({ message: "Name can't be empty!" });

    const foundTodo = await Todo.findOne({ _id: todoId }).exec();

    if (!foundTodo) return res.sendStatus(404);

    if (todoName === foundTodo.name && isCompleted === foundTodo.isCompleted)
      return res.status(200).json({ message: "No changes detected." });

    foundTodo.name = todoName;
    if (isCompleted !== undefined) foundTodo.isCompleted = isCompleted;
    foundTodo.lastEditedAt = new Date();

    await foundTodo.save();

    return res.status(200).json({ message: `Todo ${todoId} edited!` });
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
  updateTodo,
  deleteTodo,
};
