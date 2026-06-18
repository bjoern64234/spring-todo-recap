import "./Card.css";
import type {Todo} from "../types/Todo.ts";
import {useTodo} from "../contexts/TodoContext.tsx";
import {useState} from "react";
import UpdateCard from "./UpdateCard.tsx";

type CardProps = {
  todo: Todo;
}

export default function Card({ todo }: Readonly<CardProps>) {

  const [isForm, setIsForm] = useState<boolean>(true);
  const [draggable, setDraggable] = useState(false);

  const { deleteTodo, getTodo } = useTodo()

  // @ts-ignore
  const handleDataTransfer = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", todo.id);
    e.dataTransfer.setData("description", todo.description);
  }

  // @ts-ignore
  const handleUpdateCard = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsForm(false);
  }

  const handleInfo = async (id: string) => {
    const todo = await getTodo(id);
    alert(`Title: ${todo?.description}\nStatus: ${todo?.status}`);
  }

  return (
    <div
      onDragStart={handleDataTransfer}
      className="card"
      draggable={draggable}
      onMouseDown={() => setDraggable(true)}
      onMouseUp={() => setDraggable(false)}
    >
      <span
        className="remove-card"
        onClick={() => deleteTodo(todo.id)}
      >x</span>
      <button
        className="details-btn"
        onClick={handleUpdateCard}
      >Details</button>
      <button
        className="info-btn"
        onClick={() => handleInfo(todo.id)}
      >Info</button>
      <div className="card-header">
        <h2>{todo.description}</h2>
      </div>
      <UpdateCard todo={todo} isForm={isForm} setIsForm={setIsForm} formStatus={todo.status} />
    </div>
  )
}