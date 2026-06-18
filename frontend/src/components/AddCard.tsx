import "./AddCard.css"
import {useState} from "react";
import * as React from "react";
import {useTodo} from "../contexts/TodoContext.tsx";
import type {TodoRequest} from "../types/Todo.ts";

type AddCardProps = {
  isForm: boolean;
  setIsForm: (value: boolean) => void;
  formStatus: string;
}

export default function AddCard({ isForm, setIsForm, formStatus }: Readonly<AddCardProps>) {
  const [description, setDescription] = useState<string>("");

  const { addTodo } = useTodo();

  if (isForm) return null;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const newTodo: TodoRequest = {
      description: description,
      status: formStatus,
    }
    addTodo(newTodo);

    setDescription("");
    setIsForm(true)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Please enter your Task description</h2>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="hidden"
        name="status"
        value={formStatus}
      />
      <button>Add Task</button>
      <button onClick={()=> setIsForm(true)}>Close</button>
    </form>
  )
}