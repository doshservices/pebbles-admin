import "./overview.css";
import Revenue from "../../components/totalamounts/revenue/revenue";
import download from "./assets/download-icon.svg";
import Checkouts from "../../components/totalamounts/totalchecks/checkouts";
import TotalHosts from "../../components/totalamounts/totalhosts/hosts";
import TotalUsers from "../../components/totalamounts/totalusers/users";
import TotalCheckins from "../../components/totalamounts/totalchecks/checkins";
import TotalBookings from "../../components/totalamounts/bookings/bookings";
import { Search } from "../../components/search/search";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";

const Overview = () => {
  const navigate = useNavigate()

  const authenticated = isAuthenticated();
  const authName = JSON.parse(localStorage.getItem('user-name'))

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);


  return (
    <>
      <section className="overview-head">
          <div className="overview-heading desktop">
            <div>
              <h2>Overview</h2>
              <p>Hello {authName}, Welcome back!</p>
            </div>
          </div>
          <div className="search-bar">
            <Search type="search" placeholder="Search" name="search" />
          </div>
        <div className="loggedin-user">
          <div className="notification-bell">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <g clip-path="url(#clip0_2598_13837)">
                <path d="M14 25.666C15.2834 25.666 16.3334 24.616 16.3334 23.3327H11.6667C11.6667 24.616 12.7167 25.666 14 25.666ZM21 18.666V12.8327C21 9.25102 19.0984 6.25268 15.75 5.45935V4.66602C15.75 3.69768 14.9684 2.91602 14 2.91602C13.0317 2.91602 12.25 3.69768 12.25 4.66602V5.45935C8.91335 6.25268 7.00002 9.23935 7.00002 12.8327V18.666L4.66669 20.9993V22.166H23.3333V20.9993L21 18.666ZM18.6667 19.8327H9.33335V12.8327C9.33335 9.93935 11.095 7.58268 14 7.58268C16.905 7.58268 18.6667 9.93935 18.6667 12.8327V19.8327Z" fill="#2D2D2D" fill-opacity="0.7"/>
                <circle cx="20" cy="6" r="6" fill="#155EEF"/>
              </g>
              <defs>
                <clipPath id="clip0_2598_13837">
                  <rect width="28" height="28" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="notification-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M38.5 21.002C38.5 11.3595 30.6425 3.50195 21 3.50195C11.3575 3.50195 3.5 11.3595 3.5 21.002C3.5 26.077 5.6875 30.6444 9.1525 33.8469C9.1525 33.8644 9.1525 33.8645 9.135 33.882C9.31 34.0569 9.52 34.1969 9.695 34.3544C9.8 34.4419 9.8875 34.5294 9.9925 34.5994C10.3075 34.8619 10.6575 35.107 10.99 35.3519C11.1125 35.4394 11.2175 35.5094 11.34 35.597C11.6725 35.8244 12.0225 36.0345 12.39 36.227C12.5125 36.297 12.6525 36.3844 12.775 36.4544C13.125 36.6469 13.4925 36.8219 13.8775 36.9794C14.0175 37.0494 14.1575 37.1194 14.2975 37.1719C14.6825 37.3294 15.0675 37.4694 15.4525 37.5919C15.5925 37.6444 15.7325 37.6969 15.8725 37.7319C16.2925 37.8544 16.7125 37.9594 17.1325 38.0644C17.255 38.0994 17.3775 38.1344 17.5175 38.1519C18.0075 38.2569 18.4975 38.327 19.005 38.3794C19.075 38.3794 19.145 38.3969 19.215 38.4145C19.81 38.4669 20.405 38.5019 21 38.5019C21.595 38.5019 22.19 38.4669 22.7675 38.4145C22.8375 38.4145 22.9075 38.3969 22.9775 38.3794C23.485 38.327 23.975 38.2569 24.465 38.1519C24.5875 38.1344 24.71 38.0819 24.85 38.0644C25.27 37.9594 25.7075 37.8719 26.11 37.7319C26.25 37.6794 26.39 37.6269 26.53 37.5919C26.915 37.4519 27.3175 37.3294 27.685 37.1719C27.825 37.1194 27.965 37.0494 28.105 36.9794C28.4725 36.8219 28.84 36.6469 29.2075 36.4544C29.3475 36.3844 29.47 36.297 29.5925 36.227C29.9425 36.0169 30.2925 35.8244 30.6425 35.597C30.765 35.527 30.87 35.4394 30.9925 35.3519C31.3425 35.107 31.675 34.8619 31.99 34.5994C32.095 34.5119 32.1825 34.4244 32.2875 34.3544C32.48 34.1969 32.6725 34.0394 32.8475 33.882C32.8475 33.8645 32.8475 33.8644 32.83 33.8469C36.3125 30.6444 38.5 26.077 38.5 21.002ZM29.645 29.6994C24.9025 26.5144 17.1325 26.5144 12.355 29.6994C11.585 30.2069 10.955 30.8019 10.43 31.4494C7.77 28.7544 6.125 25.062 6.125 21.002C6.125 12.7945 12.7925 6.12695 21 6.12695C29.2075 6.12695 35.875 12.7945 35.875 21.002C35.875 25.062 34.23 28.7544 31.57 31.4494C31.0625 30.8019 30.415 30.2069 29.645 29.6994Z" fill="#2D2D2D" fill-opacity="0.8"/>
            <path d="M21.0001 12.127C17.3776 12.127 14.4376 15.067 14.4376 18.6895C14.4376 22.242 17.2201 25.1295 20.9126 25.2345C20.9651 25.2345 21.0351 25.2345 21.0701 25.2345C21.1051 25.2345 21.1576 25.2345 21.1926 25.2345C21.2101 25.2345 21.2276 25.2345 21.2276 25.2345C24.7626 25.112 27.5451 22.242 27.5626 18.6895C27.5626 15.067 24.6226 12.127 21.0001 12.127Z" fill="#2D2D2D" fill-opacity="0.8"/>
          </svg>
          </div>
          <div className="loggedin-user-details">
            <div>{authName} Oladimeji</div>
            <div>Personal</div>
          </div>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 15.0004L17 10.0254H7L12 15.0004Z" fill="#2D2D2D"/>
          </svg>
          </div>
        </div>
      </section>
      <section className="overview">
          <div className="overview-heading mobile">
            <div>
              <h2>Overview</h2>
              <p>Hello {authName}, Welcome back!</p>
            </div>
          </div>
        <section className="total_amount">
          <TotalBookings />
          <TotalCheckins />
          <Checkouts />
          <Revenue />
          {/* <TotalUsers />
          <TotalHosts /> */}
        </section>
        <section className="total">
          <div>
            <h3>Total Revenue</h3>
          </div>
          <div>
            <h3>Booking Chart</h3>
            <button>
              <img src={download} alt="download" />
              <span>Download Report</span>
            </button>
          </div>
          <div>
            <h3>Customer Map</h3>
            <button>Weekly</button>
          </div>
        </section>
      </section>
    </>
  );
};
export default Overview;
