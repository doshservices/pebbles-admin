import "./userdetails.css";
import axios from "axios";
import demo from './assets/demo.webp';
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
  const [error, setError] = useState("");

  const userId = JSON.parse(sessionStorage.getItem('user_un_Id'))
  // console.log(userId);

  const api = 'https://pubblessignature-production.up.railway.app/api/users/';
  const userDetails = `${api}${userId}`
  // console.log(userDetails);

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
        setError(err.message);
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
        </div>
        <section className="user-details-info">
          {details ? (
            <div className="user-details-profile">
              {details.profilePicture ? <img src={details.profilePicture} alt="profile" /> : <img src={demo} alt='demo' />}
              <div>
                {details.firstName || details.lastName ? <div>
                  <h4>{details.firstName} {details.lastName}</h4>
                </div> : ''
                }
                {
                  details.role ? <p className="member">{details.role}</p> : <></>
                }
                {
                  details.status ? <p className="address">{details.status}</p> : <></>
                }
                {
                  details.country ? <p className="address">Country:  {details.country}</p> : <></>
                }
                {
                  details.state ? <p className="address">State:  {details.state}</p> : <></>
                }
                {
                  details.city ? <p className="address">City:  {details.city} </p> : <></>
                }
                {
                  details.isVerified ? <p className="address">{details.isVerified === true ? 'Verified' : 'Pending'}</p> : <></>
                }
                <div className="contact">
                  {
                    details.email ? <p>{details.email}</p> : <></>
                  }
                  {
                    details.phoneNumber ? <p>{details.phoneNumber}</p> : <></>
                  }


                </div>
              </div>
            </div>

          ) : (<h3>{error}</h3>)}
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
      </section >
    </>
  );
};
export default UserDetails;
