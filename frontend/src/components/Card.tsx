import "./Card.css";
import type {Todo} from "../types/Todo.ts";

type CardProps = {
  todo: Todo;
}

export default function Card({ todo }: Readonly<CardProps>) {
  return (
    <div
      className="card"
    >
      <span
        className="remove-card"
      >x</span>
      <div className="card-header">
        <h2>{todo.description}</h2>
      </div>
    </div>
  )
}