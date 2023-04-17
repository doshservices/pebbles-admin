import "./users.css";
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import demoDp from './assets/demo.webp';
import axios from "axios";
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

const Users = () => {

  const navigate = useNavigate()
  const authenticated = isAuthenticated();

  const users = 'https://pubblessignature-production.up.railway.app/api/users/all';
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  console.log(details);

  const fetchData = async () => {
    setLoading(true)
    await axios.get(users, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
      .then((res) => {
        setLoading(false)
        console.log(res);
        setDetails(res.data.data.users)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        setError(err.message);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = details.slice(firstIndex, lastIndex)
  const npage = Math.ceil(details.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  const [option, setOption] = useState({})
  console.log(option);
  for (const key in option) {
    console.log(key);
    sessionStorage.setItem("user_un_Id", JSON.stringify(key));
  }

  const handleClick = (e, data) => {
    const update = { ...option }
    update[data._id] = !option[data._id]
    setOption(update)
  };
  const viewDetails = () => {
    navigate('/user-details')
  }

  const suspendApartment = () => {

  }

  return (
    <>
      <Search placeholder="Search here" />
      <section className="users">
        <div className="users-list-heading">
          <div>
            <h2>Users</h2>
            <p>List of all Users</p>
          </div>
          <button>
            <span>Filter</span>
            <img src={dropdown} alt="dropdown" />
          </button>
        </div>
        <section className="table-section">
          {loading && <CssLoader />}
          {details?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>
                    <span>Photo</span>
                    <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Country</span>
                    <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>State</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>City</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Email</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Phone</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Role</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Status</span> <img src={expand} alt="expand" />
                  </th>
                  <th>
                    <span>Options</span> <img src={expand} alt="expand" />
                  </th>
                </tr>
              </thead>
              {records.map((user, id) => {
                return (
                  <tbody key={id}>
                    <tr>
                      <td>
                        <img height='40px' src={user.profilePicture ? user.profilePicture : demoDp} alt="profile-photo" className="demo-dp" />
                      </td>
                      <td>{user.country ? user.country : 'N/A'}</td>
                      <td>{user.city ? user.city : 'N/A'}</td>
                      <td>{user.state ? user.state : 'N/A'}</td>
                      <td>{user.email ? user.email : 'N/A'}</td>
                      <td>{user.phoneNumber ? user.phoneNumber : 'N/A'}</td>
                      <td>{user.role ? user.role : 'N/A'}</td>
                      <td>{user.status ? user.status : 'N/A'}</td>
                      <td className="options" onClick={(e) => handleClick(e, user)}>
                        <img src={options} alt="options" />
                        {option[user._id] && <div className='option-details'>
                          <span onClick={viewDetails}>View Details</span><span onClick={suspendApartment}>Suspend</span>
                          {/* <span onClick={deleteApartment}>Delete</span> */}
                        </div>}
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          ) : (
            <h2>No users Found</h2>
          )}
        </section>
        {details && <div>
          <ul className="pagination">
            <li className="page-item">
              <span className="page-link" onClick={prePage}>Prev</span>
            </li>
            {numbers.map((number, i) => {
              <li className={`page-item ${currentPage === number ? 'active-bg' : ''}`} key={i}>
                <span className="page-link" onClick={() => changeCurrentPage(number)}>{number}</span>
              </li>
            })}
            <li className="page-item">
              <span className="page-link" onClick={nextPage}>Next</span>
            </li>
          </ul>
        </div>}
      </section>
    </>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
};

export default Users;
