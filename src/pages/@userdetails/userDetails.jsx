import "./userdetails.css";
import axios from "axios";
import profile from "./assets/user-profile.png";
import dropdown from "./assets/dropdown.svg";
import { Search } from "../../components/search/search";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";

const UserDetails = () => {
  const [typeRange, setTypeRange] = useState("Monthly");
  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const [details, setDetails] = useState([]);
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState("");
  console.log(details);

  const userId = JSON.parse(sessionStorage.getItem('user_un_Id'))
  console.log(userId);

  const api = 'https://pubblessignature-production.up.railway.app/api/users/';
  const userDetails = `${api}${userId}`
  console.log(userDetails);

  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );

  const fetchData = async () => {
    // setLoading(true)
    await axios.get(userDetails, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
      .then((res) => {
        // setLoading(false)
        // console.log(res);
        setDetails(res.data.data.user)
      })
      .catch((err) => {
        // setLoading(false)
        // console.log(err);
        // setError(err.message);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Search placeholder="Search here" />
      <section className="user-details">
        <div className="user-details-heading">
          <div>
            <h2>User</h2>
            <p>User Profile</p>
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
                <h4>{details.firstName ? details.firstName : ''} {details.lastName ? details.lastName : ''}</h4>
              </div>
              <p className="member">{details.role ? details.role : ''}</p>
              <p className="address">
                {details.status ? details.status : ''}
              </p>
              <div className="contact">
                <p>{details.email ? details.email : ''}</p>
                <p>{details.phoneNumber ? details.phoneNumber : ''}</p>
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
