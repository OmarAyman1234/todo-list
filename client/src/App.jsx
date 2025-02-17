import Header from "../components/Header";
import CreateTodo from "../components/CreateTodo";
import UnfinishedTodos from "../components/UnfinishedTodos";
import FinishedTodos from "../components/FinishedTodos";
import Todos from "../components/Todos";
function App() {
  return (
    <>
      <Header />
      <CreateTodo />
      <Todos />
      <UnfinishedTodos />
      <FinishedTodos />
    </>
  );
}

export default App;
