import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <ProfileButton />
   </nav>
  );
}

export default Navigation;
