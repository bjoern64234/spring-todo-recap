import "./Card.css";
import type {Todo} from "../types/Todo.ts";
import {useTodo} from "../contexts/TodoContext.tsx";
import {useState} from "react";

type CardProps = {
  todo: Todo;
}

export default function Card({ todo }: Readonly<CardProps>) {

  const [draggable, setDraggable] = useState(false);

  const { deleteTodo } = useTodo()

  // @ts-ignore
  const handleDataTransfer = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", todo.id);
    e.dataTransfer.setData("description", todo.description);
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
      <div className="card-header">
        <h2>{todo.description}</h2>
      </div>
    </div>
  )
}