import "./bookinglist.css";
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import { Search } from "../../components/search/search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { CssLoader } from "../../components/spinner/spinner";
import { Details, Options } from "../../components/options/options";

const BookingList = () => {
  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState(false)
  const [error, setError] = useState("");
  // console.log(details);

  const totalBookings =
    "https://pubblessignature-production.up.railway.app/api/bookings/all-bookings";
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const fetchData = async () => {
    setLoading(true)
    await axios
      .get(totalBookings, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setLoading(false)
        console.log(res);
        setDetails(res.data.message);
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        setError(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  return (
    <>
      <Search placeholder="Search here" />
      <section className="booking-list">
        <div className="booking-list-heading">
          <div>
            <h2>Bookings List</h2>
            <p>This is your bookings list data</p>
          </div>
          <button>
            <span>Filter</span>
            <img src={dropdown} alt="dropdown" />
          </button>
        </div>
        <section className="table-section">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Apartment Name</span>
                  <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Country</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>State</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Address</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Type</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Status</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Options</span>
                </th>
              </tr>
            </thead>
            {loading && <CssLoader />}
            {details.map((detail) => {
              return (
                <tbody key={detail.id}>
                  <tr>
                    <td>{detail.apartmentId?.apartmentName}</td>
                    <td>{detail.apartmentId?.apartmentCountry}</td>
                    <td>{detail.apartmentId?.apartmentState}</td>
                    <td>{detail.apartmentId?.address}</td>
                    <td>{detail.apartmentId?.typeOfApartment}</td>
                    <td className='status'>{detail.apartmentId?.status}</td>
                    <td className="options" onClick={() => setOption(!option)}>
                      <img src={options} alt="options" />
                      {option && <Options />}
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </section>
      </section>
    </>
  );
};

export default BookingList;
