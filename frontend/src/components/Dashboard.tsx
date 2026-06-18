import "./Dashboard.css";
import {STATUS} from "../utils/Status.ts";
import Step from "./Step.tsx";
import {useTodo} from "../contexts/TodoContext.tsx";
import AddCard from "./AddCard.tsx";
import {useState} from "react";

export default function Dashboard() {

  const [isForm, setIsForm] = useState<boolean>(true);
  const [formStatus, setFormStatus] = useState<string>("");

  const { todos } = useTodo();

  const handleAdd = (status: string) => {
    setIsForm(false)
    setFormStatus(status)
  }


  return (
    <main>
      {Object.values(STATUS).map(status => (
        <Step key={status}
              status={status}
              todos={todos.filter(todo => todo.status === status)}
              handleAdd={() => handleAdd(status)}
        />
      ))}
      <AddCard isForm={isForm} setIsForm={setIsForm} formStatus={formStatus} />
    </main>
  )
}