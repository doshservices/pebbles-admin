import "./analytics.css";
import dropdown from "./assets/dropdown.svg";
import moment from 'moment'
import { Search } from "../../components/search/search";
import { MostBooked } from "./mostBooked/booked";
import { useNavigate } from "react-router-dom";
import { getDaysInMonth } from "./bookingByDate/date";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";

const Analytics = () => {
  const days = getDaysInMonth(moment().add(0, 'months'))
  // console.log(days);

  const [typeRange, setTypeRange] = useState("Monthly");

  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  return (
    <>
      <Search placeholder='Search' />
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
            </section>
          </div>
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Most Booked Listings </h3>
              <div className="category-range">
                <button
                >
                  Monthly
                </button>
                <button
                >
                  Weekly
                </button>
                <button
                >
                  Daily
                </button>
              </div>
              <MostBooked />
            </div>
            <section>
            </section>
          </div>
          <div className="analytics-category-type">
            <div className="analytics-category-heading">
              <h3>Trendy Listings</h3>
              <div className="category-range">
                <button
                >
                  Monthly
                </button>
                <button
                >
                  Weekly
                </button>
                <button>
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
                >
                  Monthly
                </button>
                <button>
                  Weekly
                </button>
                <button>
                  Daily
                </button>
              </div>
            </div>
            <section>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
export default Analytics;
