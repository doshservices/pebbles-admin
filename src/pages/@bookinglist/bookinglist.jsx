import "./bookinglist.css";
import './options.css'
import left from './assets/left.svg';
import right from './assets/right.svg';
import axios from "axios";
import expand from "./assets/expand.svg";
import options from "./assets/options.svg";
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo, index) => {
        return <li key={index}>{todo.title}</li>;
      })}
    </ul>
  );
};

const BookingList = () => {

  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const click = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(details.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = details.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={click}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  // const handleLoadMore = () => {
  //   setitemsPerPage(itemsPerPage + 5);
  // };
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

  const [search, setSearch] = useState('')

  return (
    <>
      <Search onChange={(e) => setSearch(e.target.value)} placeholder="Search Booking list" />
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
                {currentItems.filter((detail) => {
                  return search.toLowerCase() === '' ? detail : detail.apartmentId?.apartmentName.toLowerCase().includes(search)
                }).map((detail, id) => {
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
        {
          details.length > 10 ? (
            <>
              {renderData(currentItems)}
              <ul className="pageNumbers">
                <li>
                  <img onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false} src={left} alt="left" />
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                  <img onClick={handleNextbtn}
                    disabled={currentPage == pages[pages.length - 1] ? true : false} src={right} alt="right" />
                </li>
              </ul>
            </>
          ) : null
        }
      </section>
    </>
  );
};

export default BookingList;
