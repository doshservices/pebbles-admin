import React from "react";
import logo from "../assets/logo.svg";
import NotificationLogo from "../assets/notification.svg";
import profile from "../assets/profile-circle.svg";
import { Link } from "react-router-dom";

const OverviewNav = () => {
  return (
    <header className="main__header">
      <nav className="main__header_nav">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div style={{ display: "flex", gap: "1rem" }}>
          <img
            src={NotificationLogo}
            alt="notification"
            className="notification"
          />
          <div className="profile">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={profile} alt="profile" className="profileImg" />
              <div>
                <p
                  className="profileName"
                  style={{ fontSize: ".9rem", fontWeight: "500" }}
                >
                  dosh
                </p>
                <p style={{ fontSize: ".8rem", fontWeight: "500" }}>personal</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default OverviewNav;
