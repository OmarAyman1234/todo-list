import Header from "../components/Header";
import CreateTodo from "../components/CreateTodo";
import Todos from "../components/Todos";
import { TodoProvider } from "../context/TodoContext";
function App() {
  return (
    <>
      <Header />

      <TodoProvider>
        <CreateTodo />
        <Todos />
      </TodoProvider>
    </>
  );
}

export default App;
