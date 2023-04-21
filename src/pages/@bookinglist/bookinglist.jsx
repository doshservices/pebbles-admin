import "./bookinglist.css";
import './options.css'
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import axios from "axios";
import expand from "./assets/expand.svg";
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

const BookingList = () => {
  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false)
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
        // console.log(res);
        setDetails(res.data.message);
      })
      .catch((err) => {
        setLoading(false)
        // console.log(err);
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

  const [option, setOption] = useState({})
  // console.log(option);
  for (const key in option) {
    // console.log(key);
    sessionStorage.setItem("book_un_Id", JSON.stringify(key));
  }

  const handleClick = (e, data) => {
    const update = { ...option }
    update[data._id] = !option[data._id]
    setOption(update)
  };
  const viewDetails = () => {
    navigate('/booking-detail')
  }

  return (
    <>
      <Search placeholder="Search here" />
      <section className="booking-list">
        <div className="booking-list-heading">
          <div>
            <h2>Bookings List</h2>
            <p>This is your bookings list data</p>
          </div>
        </div>
        <section className="table-section">
          <p>{error.message}</p>
          {loading && <CssLoader />}
          {details?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>
                    <span>Booking Name</span>
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
              <tbody>
                {details.map((detail, id) => {
                  return (
                    <tr key={id}>
                      <td>{detail.apartmentId?.apartmentName ? detail.apartmentId?.apartmentName : 'N/A'}</td>
                      <td>{detail.apartmentId?.apartmentCountry ? detail.apartmentId?.apartmentCountry : 'N/A'}</td>
                      <td>{detail.apartmentId?.apartmentState ? detail.apartmentId?.apartmentState : 'N/A'}</td>
                      <td>{detail.apartmentId?.address ? detail.apartmentId?.address : 'N/A'}</td>
                      <td>{detail.apartmentId?.typeOfApartment ? detail.apartmentId?.typeOfApartment : 'N/A'}</td>
                      <td className='status'>{detail.apartmentId?.status ? detail.apartmentId?.status : 'N/A'}</td>
                      <td className="options" onClick={(e) => handleClick(e, detail)}>
                        <img src={options} alt="options" />
                        {option[detail._id] && <div className='option-details'>
                          <span onClick={viewDetails}>View Details</span>
                          {/* <span onClick={suspendApartment}>Suspend</span> */}
                        </div>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (<h2>{error}</h2>)
          }
        </section>
      </section>

    </>
  );
};

export default BookingList;
