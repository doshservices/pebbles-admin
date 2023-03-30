import "./sidenav.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { addedServicesUrl, sideNavLinks } from "./navlinks";
import logo from "../../../assets/logo.svg";

export const Hamburger = (props) => {
  return (
    <div onClick={props.onClick} className="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

const SideNav = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <Hamburger onClick={() => setShowNav(!showNav)} />
      <nav className={showNav ? "sidenav hide-side-nav" : "sidenav"}>
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
