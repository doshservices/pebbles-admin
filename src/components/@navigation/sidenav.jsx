import "./sidenav.css";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import { addedServicesUrl, sideNavLinks } from "./navlinks";
import logo from "../../assets/logo.svg";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <img src={logo} alt="logo" className="logo" />
      <h3>Admin Dashboard</h3>
      {sideNavLinks.map((link) => {
        return (
          <ul key={link.id}>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={link.path}
              >
                <img src={link.icon} alt={link.name} />
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
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to={serviceUrl.path}
                >
                  <img src={serviceUrl.icon} alt={serviceUrl.name} />
                  <span>{serviceUrl.name}</span>
                </NavLink>
              </li>
            </ul>
          );
        })}
      </div>
    </nav>
  );
};

export default SideNav;
