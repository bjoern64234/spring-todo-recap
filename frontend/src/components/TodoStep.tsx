import Step from "./Step.tsx";
import AddCard from "./AddCard.tsx";
import {useState} from "react";
import {useTodo} from "../contexts/TodoContext.tsx";

type TodoStepProps = {
  status: string;
}

export default function TodoStep({ status }: Readonly<TodoStepProps>) {

  const [isForm, setIsForm] = useState<boolean>(true);
  const [formStatus, setFormStatus] = useState<string>("");

  const { todos } = useTodo();

  const handleAdd = (status: string) => {
    setIsForm(false)
    setFormStatus(status)
  }

  return (
    <>
      <Step key={status}
            status={status}
            todos={todos.filter(todo => todo.status === status)}
            handleAdd={() => handleAdd(status)}
      />
      <AddCard isForm={isForm} setIsForm={setIsForm} formStatus={formStatus} />
    </>
  )
}