import "./Dashboard.css";
import {STATUS} from "../utils/Status.ts";
import Step from "./Step.tsx";
import {useEffect, useState} from "react";
import type {Todo} from "../types/Todo.ts";
import axios from "axios";

export default function Dashboard() {

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get("/api/todo")
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <main>
      {Object.values(STATUS).map(status => (
        <Step key={status}
              status={status}
              todos={todos}
        />
      ))}
    </main>
  )
}