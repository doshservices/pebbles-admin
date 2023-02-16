import "../style/navbar.css";
import { Link } from "react-router-dom";
import { user } from "react-icons-kit/ikons/user";
import { Icon } from "react-icons-kit";

const Navbar = () => {
  return (
    <header>
      <nav>
        <h2 className="logo">pebbles</h2>
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
