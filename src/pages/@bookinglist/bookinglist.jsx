import "./bookinglist.css";
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import axios from "axios";
import { Search } from "../../components/search/search";
import { Options } from "../../components/options/options";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

const BookingList = () => {
  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [listPerPage, setListPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [option, setOption] = useState(false)
  const [error, setError] = useState("");
  console.log(error);

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

  const lastPostIndex = currentPage * listPerPage;
  const firstPostIndex = lastPostIndex - listPerPage;
  const currentPosts = details.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const handleClick = (e, data) => {
    // setData(data);
    // setShowModal(!showModal);
  };

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
          {loading && <CssLoader />}
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
            {details.map((detail) => {
              return (
                <tbody key={detail._id}>
                  <tr>
                    <td>{detail.apartmentId?.apartmentName ? detail.apartmentId?.apartmentName : 'N/A'}</td>
                    <td>{detail.apartmentId?.apartmentCountry ? detail.apartmentId?.apartmentCountry : 'N/A'}</td>
                    <td>{detail.apartmentId?.apartmentState ? detail.apartmentId?.apartmentState : 'N/A'}</td>
                    <td>{detail.apartmentId?.address ? detail.apartmentId?.address : 'N/A'}</td>
                    <td>{detail.apartmentId?.typeOfApartment ? detail.apartmentId?.typeOfApartment : 'N/A'}</td>
                    <td className='status'>{detail.apartmentId?.status ? detail.apartmentId?.status : 'N/A'}</td>
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
