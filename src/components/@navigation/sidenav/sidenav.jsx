import "./sidenav.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addedServicesUrl, sideNavLinks } from "./navlinks";
import logo from "../../../assets/logo.svg";

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
        // Do nothing if clicking ref's element or descendent elements
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

  return (
    <>
      <Hamburger onClick={() => setShowNav(!showNav)} />
      <nav ref={ref} className={showNav ? "sidenav hide-side-nav" : "sidenav"}>
        <img src={logo} alt="logo" className="logo" />
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
        </div>
      </nav>
    </>
  );
};

export default SideNav;
