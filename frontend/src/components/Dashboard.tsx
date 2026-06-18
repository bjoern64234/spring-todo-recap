import "./Dashboard.css";
import {STATUS} from "../utils/Status.ts";
import Step from "./Step.tsx";
import {useTodo} from "../contexts/TodoContext.tsx";

export default function Dashboard() {

  const { todos } = useTodo();

  return (
    <main>
      {Object.values(STATUS).map(status => (
        <Step key={status}
              status={status}
              todos={todos}
        />
      ))}
    </main>
  )
}