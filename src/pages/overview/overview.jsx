import { useEffect, useState } from "react";
import "./overview.css";
import axios from "axios";
import dropdown from "./assets/dropdown.svg";
import { Search } from "../../components/search/search";
import download from "./assets/download-icon.svg";

const Overview = () => {
  const [details, setDetails] = useState([]);
  const [apiError, setApiError] = useState("");
  const buisLength = details.length;

  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/admin/allbusiness";
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const fetchData = async () => {
    await axios
      .get(buisUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDetails(res.data.data.businessHost);
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
    <section className="overview">
      <Search type="search" placeholder="Search" name="search" />
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
        <div>
          {buisLength > 0 ? <p>{buisLength}</p> : <p>0</p>}
          <p>Total Bookings</p>
        </div>
        <div>
          <p>10</p>
          <p>Total Check-ins</p>
        </div>
        <div>
          <p>10</p>
          <p>Total Check-outs</p>
        </div>
        <div>
          <p>10</p>
          <p>Total Revenue</p>
        </div>
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
        </div>
      </section>
    </section>
  );
};
export default Overview;
