import {createContext, useContext, useEffect, useState} from "react";
import type {Todo, TodoRequest} from "../types/Todo.ts";
import * as React from "react";
import axios from "axios";

type TodoProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  getTodos: () => void;
  addTodo: (todo: TodoRequest) => void;
  deleteTodo: (id: string) => void;
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

  const addTodo = async (todo: TodoRequest) => {
    try {
      const res = await axios.post<Todo>("/api/todo", todo);
      setTodos((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete<string>(`/api/todo/${id}`);
      setTodos((prev) => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoContext.Provider value={{todos, setTodos, getTodos, addTodo, deleteTodo }}>
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