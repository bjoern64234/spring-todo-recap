import "./Step.css";
import type {Todo} from "../types/Todo.ts";
import Card from "./Card.tsx";
import {useTodo} from "../contexts/TodoContext.tsx";

type StepProps = {
  status: string;
  todos: Todo[],
  handleAdd: (status: string) => void,
}

export default function Step({ status, todos, handleAdd }: Readonly<StepProps>) {

  const { updateTodo } = useTodo()

  // @ts-ignore
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.target.classList.add("dragover");
  }

  // @ts-ignore
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.target.classList.remove("dragover");
  }

  // @ts-ignore
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragover");

    const id = e.dataTransfer.getData("id");
    const description = e.dataTransfer.getData("description");
    await updateTodo(id, { id, description, status });
  }

  return (
    <section>
      <div className="container">
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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