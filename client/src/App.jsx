import Header from "../components/Header";
import CreateTodo from "../components/CreateTodo";
import UnfinishedTodos from "../components/UnfinishedTodos";
import FinishedTodos from "../components/FinishedTodos";
function App() {
  return (
    <>
      <Header />
      <CreateTodo />
      <UnfinishedTodos />
      <FinishedTodos />
    </>
  );
}

export default App;
