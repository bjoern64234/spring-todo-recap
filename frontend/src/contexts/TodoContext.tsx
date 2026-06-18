import {createContext, useContext, useEffect, useState} from "react";
import type {Todo} from "../types/Todo.ts";
import * as React from "react";
import axios from "axios";

type TodoProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  getTodos: () => void;
}

const TodoContext = createContext<TodoProps | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      const res = await axios.get<Todo[]>("/api/todo");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider value={{todos, setTodos, getTodos }}>
      { children }
    </TodoContext.Provider>
  )
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodo was used outside of TodoProvider");
  }
  return context;
}


// eslint-disable-next-line react-refresh/only-export-components
export { TodoProvider, useTodo };