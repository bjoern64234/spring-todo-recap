import "./Step.css";
import type {Todo} from "../types/Todo.ts";
import Card from "./Card.tsx";

type StepProps = {
  status: string;
  todos: Todo[],
  handleAdd: (status: string) => void,
}

export default function Step({ status, todos, handleAdd }: Readonly<StepProps>) {
  return (
    <section>
      <div className="container">
        <div className="dropzone"
        >
          <span className="dropzone-status-name">{status}</span>
          {todos.map((todo) => (
            <Card key={todo.id} todo={todo} />
          ))}
          <div
            className="add-card"
            onClick={() => handleAdd(status)}
          >
            <h1>+</h1>
          </div>
        </div>
      </div>
    </section>
  )
}