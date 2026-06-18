import "./Card.css";
import type {Todo} from "../types/Todo.ts";
import {useTodo} from "../contexts/TodoContext.tsx";

type CardProps = {
  todo: Todo;
}

export default function Card({ todo }: Readonly<CardProps>) {

  const { deleteTodo } = useTodo();

  return (
    <div
      className="card"
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