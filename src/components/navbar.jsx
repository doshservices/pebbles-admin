import "../style/navbar.css";
import { Link } from "react-router-dom";
import { user } from "react-icons-kit/ikons/user";
import { Icon } from "react-icons-kit";
import logo from "../assets/logo.svg";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>pebbles</p>
        </div>
        <ul>
          <li>
            <Link to="/">User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
