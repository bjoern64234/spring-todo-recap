import "./UpdateCard.css";
import {useState} from "react";
import * as React from "react";
import {useTodo} from "../contexts/TodoContext.tsx";
import type {Todo, TodoRequest} from "../types/Todo.ts";

type UpdateCardProps = {
  todo: Todo;
  isForm: boolean;
  setIsForm: (value: boolean) => void;
  formStatus: string;
}

export default function UpdateCard({ todo, isForm, setIsForm, formStatus }: Readonly<UpdateCardProps>) {
  const [description, setDescription] = useState<string>(todo.description);

  const { updateTodo } = useTodo();

  if (isForm) return null;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const newTodo: TodoRequest = {
      description: description,
      status: formStatus,
    }
    await updateTodo(todo.id, newTodo);

    setDescription("");
    setIsForm(true)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Please update your Task description</h2>
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
      <button>Update Task</button>
      <button onClick={()=> setIsForm(true)}>Close</button>
    </form>
  )
}