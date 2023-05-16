import "./userdetails.css";
import axios from "axios";
import demo from './assets/demo.webp';
import dropdown from "./assets/dropdown.svg";
import { toast } from "react-toastify";
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

  const reload = () => {
    window.location.reload()
  }

  const redirect = () => {
    navigate('/users')
  }

  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");

  const userId = JSON.parse(sessionStorage.getItem('user_un_Id'))

  const api = process.env.REACT_APP_URL;
  const userDetails = `${api}/users/${userId}`

  const authToken = JSON.parse(
    localStorage.getItem("pstk")
  );

  const fetchData = async () => {
    await axios.get(userDetails, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
      .then((res) => {
        // console.log(res);
        setDetails(res.data.data.user)
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const suspendUser = async (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to suspend Host?')) {
      await axios.patch(`${api}/admin/suspendhost?id=${userId}`, {
        id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // console.log(response);
          setTimeout(reload, 5000)
          toast.success("Host Suspended", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          // console.error(error);
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }

  const deleteUser = async (e) => {
    e.preventDefault()
    if (window.confirm('Do you want to delete Host?')) {
      await axios.delete(`${api}/admin/deleteAccount?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // console.log(response);
          toast.success("Host Deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          // console.error(error);
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
    setTimeout(redirect, 3000)
  }
  const verifyUser = async (e) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to Verify Host?')) {
      await axios.patch(`${api}/admin/verifyhost?id=${userId}`, {
        id: userId,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // console.log(response);
          setTimeout(reload, 5000)
          toast.success("Host Verified", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          // console.error(error);
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  }

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
        <button className='redirect' onClick={redirect}>Back</button>
        <section className="user-details-info">
          {details ? (
            <div className="user-details-profile">
              {details.profilePicture ? <img src={details.profilePicture} alt="profile" /> : <img src={demo} alt='demo' />}
              <div>
                {details.firstName || details.lastName ? <div>
                  <h4>{details.firstName} {details.lastName}</h4>
                </div> : ''
                }
                <div className="actions">
                  <button className='action-btn veri' onClick={verifyUser}>Verify</button>
                  <button className='action-btn suspend' onClick={suspendUser}>Suspend</button>
                  <button className='action-btn delete' onClick={deleteUser}>Delete</button>
                </div>
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
                  details.phoneNumber ? <p className="address">{details.phoneNumber}</p> : <></>
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
