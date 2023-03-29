import { Search } from "../../components/search/search";
import { useState } from "react";
import dropdown from "./assets/dropdown.svg";
import profile from "./assets/user-profile.png";
import "./userdetails.css";

const UserDetails = () => {
  const [typeRange, setTypeRange] = useState("Monthly");

  return (
    <>
      <Search placeholder="Search here" />
      <section className="user-details">
        <div className="user-details-heading">
          <div>
            <h2>Guest</h2>
            <p>Guest Profile</p>
          </div>
          <div className="user-details-filter">
            <img className="profile" src="" alt="" />
            <div>
              <h5>Filter Period</h5>
              <p>10 March 2023 - 21 April 2023</p>
            </div>
            <img src={dropdown} alt="dropdown" />
          </div>
        </div>
        <section className="user-details-info">
          <div className="user-details-profile">
            <img src={profile} alt="profile" />
            <div>
              <div>
                <h4>Shai Hulud</h4>
              </div>
              <p className="member">Member</p>
              <p className="address">
                2 Compact Street, Shai Hulud Cresent, Power Rangers.
              </p>
              <div className="contact">
                <p>shai.hulud@gmail.com</p>
                <p>+234 803 123 4568</p>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: "150px",
              }}
            >
              <h3>Recent Bookings</h3>
              <div className="category-range">
                <button
                  onClick={() => setTypeRange("Monthly")}
                  className={typeRange === "Monthly" ? "active-btn" : ""}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTypeRange("Weekly")}
                  className={typeRange === "Weekly" ? "active-btn" : ""}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTypeRange("Daily")}
                  className={typeRange === "Daily" ? "active-btn" : ""}
                >
                  Daily
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              minHeight: "150px",
            }}
          >
            <h3>Current Booking</h3>
          </div>
        </section>
      </section>
    </>
  );
};
export default UserDetails;
