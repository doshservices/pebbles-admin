import "./userdetails.css";
import axios from "axios";
// import demo from './assets/demo.webp';
import demo from './assets/user-profile.png';
import dropdown from "./assets/dropdown.svg";
import { toast } from "react-toastify";
import { Search } from "../../components/search/search";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";
import Header from "../../components/header/header";

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
      <Header />
      <section className="user-details">
        {/* <button className='redirect' onClick={redirect}>Back</button> */}
        <section className="user-details-info">
          {details ? (
            <div className="user-details-profile">
              <div>
                {details.profilePicture ? <img src={details.profilePicture} alt="profile" /> : <img src={demo} alt='demo' />}
              </div>
              <div>
                <div className="info-and-actions">
                  <div className="info-name">
                    <h2>
                        Shai Hulud
                    </h2>
                  </div>
                  <div className="action-btns">
                    <button className='action-btn suspend' onClick={suspendUser}>Suspend</button>
                    <button className='action-btn delete' onClick={deleteUser}>Delete</button>
                  </div>
                </div>
                <div className="info-type">
                  <p>User</p>
                </div>
                <div className="info-address">
                  <p>2 Compact Street, Shai Hulud Cresent, Power Rangers.</p>
                </div>

                <div className="contact">
                  <div>
                    {
                      details.email ? <p>{details.email}</p> : <p>shai.hulud@gmail.com</p>
                    }
                  </div>
                  <div>
                    {
                      details.phoneNumber ? <p>{details.phoneNumber}</p> : <p>+234 803 123 4568</p>
                    }
                  </div>
                </div>
              </div>
            </div>
            ) : (<h3>{error}</h3>)
          }
          <div className="recent-booking-outer-div">
            <div
              className="recent-booking-div"
            > <div className="recent-booking-div-head">
                <h3>Recent Bookings</h3>
              </div>
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
          <div className="current-booking-div">
            <div>
              <h3>Current Booking</h3>
            </div>
            <div className="current-booking-details">
              <div>
                <div className="blue-background">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M12.5 28.0833C12.8333 28.0833 13.125 27.9583 13.375 27.7083C13.625 27.4583 13.75 27.1667 13.75 26.8333C13.75 26.5 13.625 26.2083 13.375 25.9583C13.125 25.7083 12.8333 25.5833 12.5 25.5833C12.1667 25.5833 11.875 25.7083 11.625 25.9583C11.375 26.2083 11.25 26.5 11.25 26.8333C11.25 27.1667 11.375 27.4583 11.625 27.7083C11.875 27.9583 12.1667 28.0833 12.5 28.0833ZM12.5 21.25C12.8333 21.25 13.125 21.125 13.375 20.875C13.625 20.625 13.75 20.3333 13.75 20C13.75 19.6667 13.625 19.375 13.375 19.125C13.125 18.875 12.8333 18.75 12.5 18.75C12.1667 18.75 11.875 18.875 11.625 19.125C11.375 19.375 11.25 19.6667 11.25 20C11.25 20.3333 11.375 20.625 11.625 20.875C11.875 21.125 12.1667 21.25 12.5 21.25ZM12.5 14.4167C12.8333 14.4167 13.125 14.2917 13.375 14.0417C13.625 13.7917 13.75 13.5 13.75 13.1667C13.75 12.8333 13.625 12.5417 13.375 12.2917C13.125 12.0417 12.8333 11.9167 12.5 11.9167C12.1667 11.9167 11.875 12.0417 11.625 12.2917C11.375 12.5417 11.25 12.8333 11.25 13.1667C11.25 13.5 11.375 13.7917 11.625 14.0417C11.875 14.2917 12.1667 14.4167 12.5 14.4167ZM18 28.0833H28.1667V25.5833H18V28.0833ZM18 21.25H28.1667V18.75H18V21.25ZM18 14.4167H28.1667V11.9167H18V14.4167ZM7.5 35C6.83333 35 6.25 34.75 5.75 34.25C5.25 33.75 5 33.1667 5 32.5V7.5C5 6.83333 5.25 6.25 5.75 5.75C6.25 5.25 6.83333 5 7.5 5H32.5C33.1667 5 33.75 5.25 34.25 5.75C34.75 6.25 35 6.83333 35 7.5V32.5C35 33.1667 34.75 33.75 34.25 34.25C33.75 34.75 33.1667 35 32.5 35H7.5ZM7.5 32.5H32.5V7.5H7.5V32.5Z" fill="#F8F8F8"/>
                </svg>
                </div>
              </div>
              <div>
                <div>Booking ID #00110</div>
                <div>Shai Hulud's Lair</div>
              </div>
              <div>
                <div> 
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.99996 7.98242C7.26663 7.98242 6.66663 7.74909 6.19996 7.28242C5.73329 6.81576 5.49996 6.21576 5.49996 5.48242C5.49996 4.74909 5.73329 4.14909 6.19996 3.68242C6.66663 3.21576 7.26663 2.98242 7.99996 2.98242C8.73329 2.98242 9.33329 3.21576 9.79996 3.68242C10.2666 4.14909 10.5 4.74909 10.5 5.48242C10.5 6.21576 10.2666 6.81576 9.79996 7.28242C9.33329 7.74909 8.73329 7.98242 7.99996 7.98242ZM2.66663 13.3324V11.7658C2.66663 11.3435 2.77218 10.9824 2.98329 10.6824C3.1944 10.3824 3.46663 10.1546 3.79996 9.99909C4.5444 9.66576 5.25829 9.41576 5.94163 9.24909C6.62496 9.08242 7.31107 8.99909 7.99996 8.99909C8.68885 8.99909 9.37218 9.0852 10.05 9.25742C10.7277 9.42964 11.4384 9.67794 12.182 10.0023C12.5298 10.1593 12.8086 10.3869 13.0185 10.6851C13.2284 10.9833 13.3333 11.3435 13.3333 11.7658V13.3324H2.66663ZM3.66663 12.3324H12.3333V11.7658C12.3333 11.588 12.2805 11.4185 12.175 11.2574C12.0694 11.0963 11.9388 10.9769 11.7833 10.8991C11.0722 10.5546 10.4222 10.3185 9.83329 10.1908C9.2444 10.063 8.63329 9.99909 7.99996 9.99909C7.36663 9.99909 6.74996 10.063 6.14996 10.1908C5.54996 10.3185 4.89996 10.5546 4.19996 10.8991C4.0444 10.9769 3.91663 11.0963 3.81663 11.2574C3.71663 11.4185 3.66663 11.588 3.66663 11.7658V12.3324ZM7.99996 6.98242C8.43329 6.98242 8.79163 6.84076 9.07496 6.55742C9.35829 6.27409 9.49996 5.91576 9.49996 5.48242C9.49996 5.04909 9.35829 4.69076 9.07496 4.40742C8.79163 4.12409 8.43329 3.98242 7.99996 3.98242C7.56663 3.98242 7.20829 4.12409 6.92496 4.40742C6.64163 4.69076 6.49996 5.04909 6.49996 5.48242C6.49996 5.91576 6.64163 6.27409 6.92496 6.55742C7.20829 6.84076 7.56663 6.98242 7.99996 6.98242Z" fill="#2D2D2D"/>
                  </svg>
                  </span> 
                  Expected Guest
                </div>
                <div>3 Adults</div>
              </div>
              <div>
                <div>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <g clip-path="url(#clip0_2624_1437)">
                        <path d="M11.3333 7.33333V2H4.66667V4.66667H2V14H7.33333V11.3333H8.66667V14H14V7.33333H11.3333ZM4.66667 12.6667H3.33333V11.3333H4.66667V12.6667ZM4.66667 10H3.33333V8.66667H4.66667V10ZM4.66667 7.33333H3.33333V6H4.66667V7.33333ZM7.33333 10H6V8.66667H7.33333V10ZM7.33333 7.33333H6V6H7.33333V7.33333ZM7.33333 4.66667H6V3.33333H7.33333V4.66667ZM10 10H8.66667V8.66667H10V10ZM10 7.33333H8.66667V6H10V7.33333ZM10 4.66667H8.66667V3.33333H10V4.66667ZM12.6667 12.6667H11.3333V11.3333H12.6667V12.6667ZM12.6667 10H11.3333V8.66667H12.6667V10Z" fill="#2D2D2D" fill-opacity="0.9"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_2624_1437">
                          <rect width="16" height="16" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Apartment Type
                </div>
                <div>Mansion</div>
              </div>
              <div>
                <div>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 14.6673C2.73333 14.6673 2.5 14.5673 2.3 14.3673C2.1 14.1673 2 13.934 2 13.6673V3.33398C2 3.06732 2.1 2.83398 2.3 2.63398C2.5 2.43398 2.73333 2.33398 3 2.33398H4.08333V1.33398H5.16667V2.33398H10.8333V1.33398H11.9167V2.33398H13C13.2667 2.33398 13.5 2.43398 13.7 2.63398C13.9 2.83398 14 3.06732 14 3.33398V13.6673C14 13.934 13.9 14.1673 13.7 14.3673C13.5 14.5673 13.2667 14.6673 13 14.6673H3ZM3 13.6673H13V6.50065H3V13.6673ZM3 5.50065H13V3.33398H3V5.50065ZM8 9.33398C7.81111 9.33398 7.65278 9.27009 7.525 9.14232C7.39722 9.01454 7.33333 8.85621 7.33333 8.66732C7.33333 8.47843 7.39722 8.3201 7.525 8.19232C7.65278 8.06454 7.81111 8.00065 8 8.00065C8.18889 8.00065 8.34722 8.06454 8.475 8.19232C8.60278 8.3201 8.66667 8.47843 8.66667 8.66732C8.66667 8.85621 8.60278 9.01454 8.475 9.14232C8.34722 9.27009 8.18889 9.33398 8 9.33398ZM5.33333 9.33398C5.14444 9.33398 4.98611 9.27009 4.85833 9.14232C4.73056 9.01454 4.66667 8.85621 4.66667 8.66732C4.66667 8.47843 4.73056 8.3201 4.85833 8.19232C4.98611 8.06454 5.14444 8.00065 5.33333 8.00065C5.52222 8.00065 5.68056 8.06454 5.80833 8.19232C5.93611 8.3201 6 8.47843 6 8.66732C6 8.85621 5.93611 9.01454 5.80833 9.14232C5.68056 9.27009 5.52222 9.33398 5.33333 9.33398ZM10.6667 9.33398C10.4778 9.33398 10.3194 9.27009 10.1917 9.14232C10.0639 9.01454 10 8.85621 10 8.66732C10 8.47843 10.0639 8.3201 10.1917 8.19232C10.3194 8.06454 10.4778 8.00065 10.6667 8.00065C10.8556 8.00065 11.0139 8.06454 11.1417 8.19232C11.2694 8.3201 11.3333 8.47843 11.3333 8.66732C11.3333 8.85621 11.2694 9.01454 11.1417 9.14232C11.0139 9.27009 10.8556 9.33398 10.6667 9.33398ZM8 12.0007C7.81111 12.0007 7.65278 11.9368 7.525 11.809C7.39722 11.6812 7.33333 11.5229 7.33333 11.334C7.33333 11.1451 7.39722 10.9868 7.525 10.859C7.65278 10.7312 7.81111 10.6673 8 10.6673C8.18889 10.6673 8.34722 10.7312 8.475 10.859C8.60278 10.9868 8.66667 11.1451 8.66667 11.334C8.66667 11.5229 8.60278 11.6812 8.475 11.809C8.34722 11.9368 8.18889 12.0007 8 12.0007ZM5.33333 12.0007C5.14444 12.0007 4.98611 11.9368 4.85833 11.809C4.73056 11.6812 4.66667 11.5229 4.66667 11.334C4.66667 11.1451 4.73056 10.9868 4.85833 10.859C4.98611 10.7312 5.14444 10.6673 5.33333 10.6673C5.52222 10.6673 5.68056 10.7312 5.80833 10.859C5.93611 10.9868 6 11.1451 6 11.334C6 11.5229 5.93611 11.6812 5.80833 11.809C5.68056 11.9368 5.52222 12.0007 5.33333 12.0007ZM10.6667 12.0007C10.4778 12.0007 10.3194 11.9368 10.1917 11.809C10.0639 11.6812 10 11.5229 10 11.334C10 11.1451 10.0639 10.9868 10.1917 10.859C10.3194 10.7312 10.4778 10.6673 10.6667 10.6673C10.8556 10.6673 11.0139 10.7312 11.1417 10.859C11.2694 10.9868 11.3333 11.1451 11.3333 11.334C11.3333 11.5229 11.2694 11.6812 11.1417 11.809C11.0139 11.9368 10.8556 12.0007 10.6667 12.0007Z" fill="#2D2D2D"/>
                    </svg>
                  </span>
                  Booking Date
                </div>
                <div>Feb 12 - 18, 2023</div>
              </div>
              <div>
                <div>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.51658 12.784H8.43325V11.9173C9.11103 11.8395 9.63881 11.6312 10.0166 11.2923C10.3944 10.9534 10.5833 10.5007 10.5833 9.93398C10.5833 9.36732 10.4221 8.90621 10.0999 8.55065C9.7777 8.1951 9.23325 7.85621 8.46658 7.53398C7.82214 7.26732 7.35547 7.02843 7.06659 6.81732C6.7777 6.60621 6.63325 6.32287 6.63325 5.96732C6.63325 5.62287 6.75825 5.35065 7.00825 5.15065C7.25825 4.95065 7.59992 4.85065 8.03325 4.85065C8.36658 4.85065 8.65547 4.92843 8.89992 5.08398C9.14436 5.23954 9.34992 5.47287 9.51658 5.78398L10.3166 5.40065C10.1277 5.01176 9.8777 4.70621 9.56658 4.48398C9.25547 4.26176 8.88881 4.12843 8.46658 4.08398V3.23398H7.54992V4.08398C6.98325 4.16176 6.53603 4.3701 6.20825 4.70898C5.88047 5.04787 5.71659 5.46732 5.71659 5.96732C5.71659 6.51176 5.88325 6.9451 6.21659 7.26732C6.54992 7.58954 7.04992 7.88954 7.71658 8.16732C8.46103 8.47843 8.97214 8.75898 9.24992 9.00898C9.5277 9.25898 9.66658 9.56732 9.66658 9.93398C9.66658 10.2895 9.51936 10.5757 9.22492 10.7923C8.93047 11.009 8.56103 11.1173 8.11658 11.1173C7.68325 11.1173 7.29714 10.9951 6.95825 10.7507C6.61936 10.5062 6.38325 10.1729 6.24992 9.75065L5.39992 10.034C5.63325 10.5451 5.91936 10.9479 6.25825 11.2423C6.59714 11.5368 7.01658 11.7507 7.51658 11.884V12.784ZM7.99992 14.6673C7.08881 14.6673 6.2277 14.4923 5.41658 14.1423C4.60547 13.7923 3.89714 13.3145 3.29159 12.709C2.68603 12.1034 2.20825 11.3951 1.85825 10.584C1.50825 9.77287 1.33325 8.91176 1.33325 8.00065C1.33325 7.07843 1.50825 6.21176 1.85825 5.40065C2.20825 4.58954 2.68603 3.88398 3.29159 3.28398C3.89714 2.68398 4.60547 2.20898 5.41658 1.85898C6.2277 1.50898 7.08881 1.33398 7.99992 1.33398C8.92214 1.33398 9.78881 1.50898 10.5999 1.85898C11.411 2.20898 12.1166 2.68398 12.7166 3.28398C13.3166 3.88398 13.7916 4.58954 14.1416 5.40065C14.4916 6.21176 14.6666 7.07843 14.6666 8.00065C14.6666 8.91176 14.4916 9.77287 14.1416 10.584C13.7916 11.3951 13.3166 12.1034 12.7166 12.709C12.1166 13.3145 11.411 13.7923 10.5999 14.1423C9.78881 14.4923 8.92214 14.6673 7.99992 14.6673ZM7.99992 13.6673C9.5777 13.6673 10.9166 13.1145 12.0166 12.009C13.1166 10.9034 13.6666 9.56732 13.6666 8.00065C13.6666 6.42287 13.1166 5.08398 12.0166 3.98398C10.9166 2.88398 9.5777 2.33398 7.99992 2.33398C6.43325 2.33398 5.09714 2.88398 3.99159 3.98398C2.88603 5.08398 2.33325 6.42287 2.33325 8.00065C2.33325 9.56732 2.88603 10.9034 3.99159 12.009C5.09714 13.1145 6.43325 13.6673 7.99992 13.6673Z" fill="#2D2D2D"/>
                    </svg>
                  </span>
                  Booking Price
                </div>
                <div>Total: $490</div>
              </div>
            </div>
            <div className="horizontal-divider"></div>
          </div>
        </section>
      </section >
    </>
  );
};
export default UserDetails;

// {details ? (
//   <div className="user-details-profile">
//     {details.profilePicture ? <img src={details.profilePicture} alt="profile" /> : <img src={demo} alt='demo' />}
//     <div>
//       {details.firstName || details.lastName ? <div>
//         <h4>{details.firstName} {details.lastName}</h4>
//       </div> : ''
//       }
//       <div className="actions">
//         <button className='action-btn veri' onClick={verifyUser}>Verify</button>
//         <button className='action-btn suspend' onClick={suspendUser}>Suspend</button>
//         <button className='action-btn delete' onClick={deleteUser}>Delete</button>
//       </div>
//       {
//         details.role ? <p className="member">{details.role}</p> : <></>
//       }
//       {
//         details.status ? <p className="address">{details.status}</p> : <></>
//       }
//       {
//         details.country ? <p className="address">Country:  {details.country}</p> : <></>
//       }
//       {
//         details.state ? <p className="address">State:  {details.state}</p> : <></>
//       }
//       {
//         details.city ? <p className="address">City:  {details.city} </p> : <></>
//       }
//       {
//         details.phoneNumber ? <p className="address">{details.phoneNumber}</p> : <></>
//       }
//       <div className="contact">
//         {
//           details.email ? <p>{details.email}</p> : <></>
//         }
//         {
//           details.phoneNumber ? <p>{details.phoneNumber}</p> : <></>
//         }
//       </div>
//     </div>
//   </div>
//   ) : (<h3>{error}</h3>)
// }
