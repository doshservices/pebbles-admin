import { useEffect, useState } from "react";
import "./overview.css";
import axios from "axios";
import dropdown from "./assets/dropdown.svg";
import { Search } from "../../components/search/search";
import download from "./assets/download-icon.svg";
import TotalBookings from "../../components/totalamounts/bookings/bookings";
import TotalCheckins from "../../components/totalamounts/totalchecks/checkins";
import Checkouts from "../../components/totalamounts/totalchecks/checkouts";
import Revenue from "../../components/totalamounts/revenue/revenue";

const Overview = () => {
  const [details, setDetails] = useState([]);
  // console.log(details);
  const [apiError, setApiError] = useState("");
  // console.log(apiError);
  //length of all bookings
  const buisLength = details.length;
  // console.log(buisLength);

  const totalBookings =
    "https://pubblessignature-production.up.railway.app/api/bookings/all-bookings";
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const fetchData = async () => {
    await axios
      .get(totalBookings, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDetails(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setApiError(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Search type="search" placeholder="Search" name="search" />
      <section className="overview">
        <div className="overview-heading">
          <div>
            <h2>Overview</h2>
            <p>Hello Admin, Welcome back!</p>
          </div>
          <div className="overview-filter">
            <div>
              <h5>Filter</h5>
              <p>10 Mar 2023 - 10 Apr 2023</p>
            </div>
            <img src={dropdown} alt="filter" />
          </div>
        </div>
        <section className="total_amount">
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
            <h3>Total Revenue</h3>
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
