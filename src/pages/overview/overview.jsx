import "./overview.css";
import dropdown from "./assets/dropdown.svg";
import { Search } from "../../components/search/search";
import download from "./assets/download-icon.svg";
import TotalBookings from "../../components/totalamounts/bookings/bookings";
import TotalCheckins from "../../components/totalamounts/totalchecks/checkins";
import Checkouts from "../../components/totalamounts/totalchecks/checkouts";
import Revenue from "../../components/totalamounts/revenue/revenue";
import { isAuthenticated } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TotalUsers from "../../components/totalamounts/totalusers/users";
import TotalHosts from "../../components/totalamounts/totalhosts/hosts";

const Overview = () => {
  const navigate = useNavigate()

  const authenticated = isAuthenticated();
  const authName = JSON.parse(localStorage.getItem('user-name'))
  console.log(authName);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);


  return (
    <>
      <Search type="search" placeholder="Search" name="search" />
      <section className="overview">
        <div className="overview-heading">
          <div>
            <h2>Overview</h2>
            <p>Hello {authName}, Welcome back!</p>
          </div>
        </div>
        <section className="total_amount">
          <TotalUsers />
          <TotalHosts />
          <TotalBookings />
          <TotalCheckins />
          <Checkouts />
          <Revenue />
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
