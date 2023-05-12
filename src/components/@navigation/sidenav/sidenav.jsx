import "./sidenav.css";
import logo from "../../../assets/logo.svg";
import { isAuthenticated } from "../../../utils/helpers";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addedServicesUrl, sideNavLinks } from "./navlinks";

export const Hamburger = (props) => {
  return (
    <div onClick={props.onClick} ref={props.ref} className="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const SideNav = () => {

  const ref = useRef();
  const [showNav, setShowNav] = useState(false);
  useOnClickOutside(ref, () => setShowNav(false));

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  const changeRoute = useNavigate()
  const clearStorage = (e) => {
    localStorage.removeItem('psid')
    localStorage.removeItem('pstk')
    changeRoute('/login')
    window.location.reload(true)
  }
  const authenticated = isAuthenticated();
  const [returnNav, setReturnNav] = useState('return-nav')
  useEffect(() => {
    if (!authenticated) {
      setReturnNav('not-return-nav')
    }
  }, [authenticated]);

  return (
    <div className={returnNav}>
      <Hamburger onClick={() => setShowNav(!showNav)} />
      <nav ref={ref} className={showNav ? "sidenav hide-side-nav" : "sidenav"}>
        <Link to='/' onClick={() => setShowNav(!showNav)}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <h3>Admin Dashboard</h3>
        {sideNavLinks.map((link) => {
          return (
            <ul key={link.id}>
              <li onClick={() => setShowNav(!showNav)}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={link.path}
                >
                  <>{link.icon}</>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            </ul>
          );
        })}
        <div className="sidenav-added-services">
          <h4>Add-on Services</h4>
          {addedServicesUrl.map((serviceUrl) => {
            return (
              <ul key={serviceUrl.id}>
                <li onClick={() => setShowNav(!showNav)}>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={serviceUrl.path}
                  >
                    <>{serviceUrl.icon}</>
                    <span>{serviceUrl.name}</span>
                  </NavLink>
                </li>
              </ul>
            );
          })}
          <button className="logout" onClick={clearStorage}>
            <img height='20px' src={require('../icons/logout.png')} alt="logout" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
