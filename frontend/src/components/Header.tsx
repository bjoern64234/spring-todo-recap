import "./Header.css";
import {NavLink} from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="brand">
        <h2>Super Kanban</h2>
      </div>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/todo">Todo</NavLink>
        <NavLink to="/doing">Doing</NavLink>
        <NavLink to="/done">Done</NavLink>
      </div>
    </nav>
  )
}