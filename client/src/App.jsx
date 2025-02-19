import Header from "../components/Header";
import CreateTodo from "../components/CreateTodo";
import Todos from "../components/Todos";
import { TodoProvider } from "../context/TodoContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />

      <TodoProvider>
        <CreateTodo />
        <Todos />
      </TodoProvider>

      <Toaster
        toastOptions={{
          position: "bottom-right",
          style: { backgroundColor: "#333", color: "white" },
        }}
      />
    </>
  );
}

export default App;
