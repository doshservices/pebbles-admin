import { useEffect, useState } from "react";
import "../../style/overview.css";
import axios from "axios";

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
      <h2>All Time</h2>
      <section className="total_amount">
        <div>
          {buisLength > 0 ? <p>{buisLength}</p> : <p>0</p>}

          <p>Buisness Hosts</p>
        </div>
        <div>
          <p>10</p>
          <p>Sheduled Booking</p>
        </div>
        <div>
          <p>10</p>
          <p>Check-ins</p>
        </div>
        <div>
          <p>10</p>
          <p>Check-out</p>
        </div>
      </section>
    </section>
  );
};
export default Overview;
