import './App.css'
import Header from "./components/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import TodoStep from "./components/TodoStep.tsx";
import {STATUS} from "./utils/Status.ts";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {Object.values(STATUS).map(status => (
          <Route path={`/${status}`} element={<TodoStep status={status} />} />
        ))}
      </Routes>
    </>
  )
}

export default App
