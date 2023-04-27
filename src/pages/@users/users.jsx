import "./users.css";
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import demoDp from './assets/demo.webp';
import axios from "axios";
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/pagination";
import { toast } from 'react-toastify';

const Users = () => {

  const navigate = useNavigate()
  const authenticated = isAuthenticated();

  const users = 'https://pubblessignature-production.up.railway.app/api/users/all';
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const [details, setDetails] = useState([]);
  // console.log(details);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true)
    await axios.get(users, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    })
      .then((res) => {
        setLoading(false)
        // console.log(res);
        setDetails(res.data.data.users)
      })
      .catch((err) => {
        setLoading(false)
        // console.log(err);
        setError(err.message);
      });
  }
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
  const id = JSON.parse(sessionStorage.getItem('user_un_Id'))
  const api = 'https://pubblessignature-production.up.railway.app/api/admin/'

  const suspendUser = async (e) => {
    setLoading(true)
    e.preventDefault()

    if (window.confirm('Are you sure you want to suspend User?')) {
      await axios.patch(`${api}suspendhost?id=${id}`, {
        id: id,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // console.log(response);
          setLoading(false)
          toast.success("User Suspended", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          setLoading(false)
          // console.error(error);
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
    const reload = () => {
      window.location.reload()
    }
    setTimeout(reload, 5000)
  }
  const verifyUser = async (e) => {
    setLoading(true)
    e.preventDefault()

    if (window.confirm('Are you sure you want to Verify User?')) {
      await axios.patch(`${api}verifyhost?id=${id}`, {
        id: id,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setLoading(false)
          // console.log(response);
          toast.success("User Verified", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          setLoading(false)
          // console.error(error);
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
    const reload = () => {
      window.location.reload()
    }
    setTimeout(reload, 5000)

  }
  const deleteUser = async (e) => {
    e.preventDefault()
    // console.log(authToken)
    setLoading(true)
    if (window.confirm('Do you want to delete User?')) {
      await axios.delete(`${api}deleteAccount?id=${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // console.log(response);
          setLoading(false)
          toast.success("User Deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch(error => {
          setLoading(false)
          // console.error(error);
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
    const reload = () => {
      window.location.reload()
    }
    setTimeout(reload, 5000)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(5)
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = details.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  const [search, setSearch] = useState('')


  return (
    <>
      <Search onChange={(e) => setSearch(e.target.value)} placeholder="Search Users" />
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
                  </th>
                  <th>
                    <span>Name</span>
                  </th>
                  <th>
                    <span>Country</span>
                  </th>
                  <th>
                    <span>State</span>
                  </th>
                  <th>
                    <span>Email</span>
                  </th>
                  <th>
                    <span>Phone</span>
                  </th>
                  <th>
                    <span>Role</span>
                  </th>
                  <th>
                    <span>Status</span>
                  </th>
                  <th>
                    <span>Verified</span>
                  </th>
                  <th>
                    <span>Options</span>
                  </th>
                </tr>
              </thead>
              {currentPosts.filter((user) => {
                return search.toLowerCase() === '' ? user : user.firstName.toLowerCase().includes(search)
              }).map((user, id) => {
                return (
                  <tbody key={id}>
                    <tr>
                      <td>
                        <img height='40px' src={user.profilePicture ? user.profilePicture : demoDp} alt="profile" className="demo-dp" />
                      </td>
                      <td>{user.firstName ? user.firstName : 'N/A'} {user.lastName ? user.lastName : 'N/A'}</td>
                      <td>{user.country ? user.country : 'N/A'}</td>
                      <td>{user.state ? user.state : 'N/A'}</td>
                      <td>{user.email ? user.email : 'N/A'}</td>
                      <td>{user.phoneNumber ? user.phoneNumber : 'N/A'}</td>
                      <td>{user.role ? user.role : 'N/A'}</td>
                      <td>{user.status ? user.status : 'N/A'}</td>
                      <td><span className={user.isVerified === true ? 'verified' : 'pending'}>{user.isVerified === true ? 'Verified' : 'Pending'}</span></td>
                      <td className="options" onClick={(e) => handleClick(e, user)}>
                        <img src={options} alt="options" />
                        {option[user._id] && <div className='option-details'>
                          <span onClick={viewDetails}>View Details</span>
                          <span onClick={suspendUser}>Suspend</span>
                          <span onClick={verifyUser}>Verify</span>
                          <span onClick={deleteUser}>Delete</span>
                        </div>}
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          ) : (
            <h2>{error}</h2>
          )}
        </section>
        <Pagination postPerPage={postPerPage} totalPosts={details.length} paginate={paginate} />
      </section>
    </>
  );
};

export default Users;
