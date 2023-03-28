import "./analytics.css";
import { Search } from "../../components/search/search";
import { useState } from "react";
import dropdown from "./assets/dropdown.svg";

const Analytics = () => {
  const [typeRange, setTypeRange] = useState("Monthly");

  return (
    <>
      <Search />
      <section className="analytics">
        <div className="analytics-heading">
          <div>
            <h2>Analytics</h2>
            <p>Summary of activities</p>
          </div>
          <div className="analytics-filter">
            <img className="profile" src="" alt="" />
            <div>
              <h5>Filter Period</h5>
              <p>10 March 2023 - 21 April 2023</p>
            </div>
            <img src={dropdown} alt="dropdown" />
          </div>
        </div>
        <div className="analytics-category">
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Bookings</h3>
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
            <section>
              {typeRange === "Monthly" && <p>Monthly</p>}
              {typeRange === "Weekly" && <p>Weekly</p>}
              {typeRange === "Daily" && <p>Daily</p>}
            </section>
          </div>
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Most Booked Listings </h3>
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
            <section>
              {typeRange === "Monthly" && <p>Monthly</p>}
              {typeRange === "Weekly" && <p>Weekly</p>}
              {typeRange === "Daily" && <p>Daily</p>}
            </section>
          </div>
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Trendy Listings</h3>
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
            <section>
              {typeRange === "Monthly" && <p>Monthly</p>}
              {typeRange === "Weekly" && <p>Weekly</p>}
              {typeRange === "Daily" && <p>Daily</p>}
            </section>
          </div>
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Revenues</h3>
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
            <section>
              {typeRange === "Monthly" && <p>Monthly</p>}
              {typeRange === "Weekly" && <p>Weekly</p>}
              {typeRange === "Daily" && <p>Daily</p>}
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
export default Analytics;
