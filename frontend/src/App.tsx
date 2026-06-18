import './App.css'
import Header from "./components/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo" element={<Dashboard />} />
        <Route path="/doing" element={<Dashboard />} />
        <Route path="/done" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
