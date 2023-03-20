import "../style/navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import overview from "../assets/overview.svg";
import bookings from "../assets/bookings.svg";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            <img src={overview} alt="overview" />
            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings">
            <img src={bookings} alt="bookings" />
            <span>Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/notification">
            <span>Notifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/buisness">
            <span>Buisness Host</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/individual">
            <span>Individual Host</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions">
            <span>Transaction</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
