import "./users.css";
import left from '../@bookinglist/assets/left.svg';
import right from '../@bookinglist/assets/right.svg';
import axios from "axios";
import demoDp from './assets/demo.webp';
import options from "./assets/options.svg";
import { toast } from 'react-toastify';
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState, useRef } from "react";

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo, index) => {
        return <li key={index}>{todo.title}</li>
      })}
    </ul>
  );
};

const Users = () => {

  const navigate = useNavigate()
  const authenticated = isAuthenticated();

  const api = process.env.REACT_APP_URL;
  const authToken = JSON.parse(
    localStorage.getItem("pstk")
  );
//   const details = [
//     {
//       "isVerified": false,
//       "status": "active",
//       "_id": "64d55556263e0f006fbf27e3",
//       "firstName": "Ezra",
//       "lastName": "Miller",
//       "email": "bernardezra112@gmail.com",
//       "phoneNumber": "09135248299",
//       "googleSigned": false,
//       "role": "INDIVIDUAL",
//       "otp": "156458",
//       "createdAt": "2023-08-10T21:23:34.516Z",
//       "updatedAt": "2023-08-10T21:23:34.516Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64d360a85f92730019ea1e88",
//       "firstName": "Shazam",
//       "lastName": "Shazam",
//       "email": "ahmzar3@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "07033086139",
//       "role": "USER",
//       "otp": null,
//       "createdAt": "2023-08-09T09:47:20.286Z",
//       "updatedAt": "2023-08-09T09:47:50.973Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "SUSPENDED",
//       "_id": "64cba9ff7917290018554bf1",
//       "businessName": "",
//       "firstName": "Fadilat ",
//       "lastName": "Tijani",
//       "email": "motolastouch@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "08131062768",
//       "role": "INDIVIDUAL",
//       "otp": null,
//       "createdAt": "2023-08-03T13:22:07.749Z",
//       "updatedAt": "2023-08-08T13:54:07.111Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64ca421d7917290018554acb",
//       "businessName": "Urban kulture",
//       "firstName": "Rahman",
//       "lastName": "Alade",
//       "email": "rahman.ross@yahoo.com",
//       "googleSigned": true,
//       "phoneNumber": "08067537210",
//       "role": "BUSINESS",
//       "otp": null,
//       "createdAt": "2023-08-02T11:46:37.821Z",
//       "updatedAt": "2023-08-02T11:52:07.253Z",
//       "__v": 0,
//       "cacDocument": "http://res.cloudinary.com/pebbles-signature/image/upload/v1690977124/a2aldry34w98wb67rjdm.jpg",
//       "city": "lagos",
//       "companyAddress": "LAGOS",
//       "country": "NG",
//       "profilePicture": "https://res.cloudinary.com/pebbles-signature/image/upload/v1690977110/rgk0inxgv3iomdctn406.jpg",
//       "state": "Lagos",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1690977113/jhnxqvhi5ihhepj9z1ih.jpg"
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64a7ebf370440b001b52bf0a",
//       "firstName": "erin",
//       "lastName": "ola",
//       "email": "erin@email.com",
//       "googleSigned": true,
//       "phoneNumber": "08166245112",
//       "role": "USER",
//       "otp": null,
//       "createdAt": "2023-07-07T10:41:55.878Z",
//       "updatedAt": "2023-07-07T10:42:13.206Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64a7e9d070440b001b52bee2",
//       "firstName": "vcc",
//       "lastName": "dff",
//       "email": "neutrinookoye@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "08166245119",
//       "role": "USER",
//       "otp": null,
//       "createdAt": "2023-07-07T10:32:48.759Z",
//       "updatedAt": "2023-07-07T10:33:11.196Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64a7e56070440b001b52bea3",
//       "firstName": "Fave",
//       "lastName": "Okoye",
//       "email": "okoy@email.com",
//       "googleSigned": true,
//       "phoneNumber": "08166245118",
//       "role": "USER",
//       "otp": null,
//       "createdAt": "2023-07-07T10:13:53.037Z",
//       "updatedAt": "2023-07-07T10:14:24.248Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "6495886712e866001838e435",
//       "businessName": "Dosh Services",
//       "firstName": "Dosh",
//       "lastName": "Services",
//       "email": "pebblesbookings@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "08094543296",
//       "role": "BUSINESS",
//       "otp": null,
//       "createdAt": "2023-06-23T11:56:23.525Z",
//       "updatedAt": "2023-06-23T12:28:33.901Z",
//       "__v": 0,
//       "cacDocument": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687523308/ggzdgi3srwowf7zw0iv9.png",
//       "city": "Lagos, Nigeria",
//       "companyAddress": "zone 4b bolaji bibere",
//       "country": "NG",
//       "state": "Lagos",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687523302/swb8rpfw3og4scdpgdxe.png"
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64917f6812e866001838e36b",
//       "businessName": "JLaw Ventures",
//       "firstName": "Jimmy",
//       "lastName": "Law",
//       "email": "jimmy@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "09018765654",
//       "role": "BUSINESS",
//       "otp": null,
//       "createdAt": "2023-06-20T10:28:56.179Z",
//       "updatedAt": "2023-06-20T10:33:00.686Z",
//       "__v": 0,
//       "cacDocument": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687257022/iuwfax94m1dilyud6rjj.jpg",
//       "city": "Ibadan",
//       "country": "NG",
//       "profilePicture": "https://res.cloudinary.com/pebbles-signature/image/upload/v1687257008/hswbefmt7us14tspzzi2.jpg",
//       "state": "Oyo",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687257014/nnizv7pqhrnourayxw48.jpg",
//       "companyAddress": "N5/64F Orita Basorun, Ibadan, Oyo State, Nigeria."
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "64917dd212e866001838e34d",
//       "businessName": "",
//       "firstName": "okon",
//       "lastName": "okonkwo",
//       "email": "okon@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "09087282737",
//       "role": "INDIVIDUAL",
//       "otp": null,
//       "createdAt": "2023-06-20T10:22:10.691Z",
//       "updatedAt": "2023-06-20T10:23:23.907Z",
//       "__v": 0,
//       "city": "Ibadan",
//       "country": "NG",
//       "profilePicture": "https://res.cloudinary.com/pebbles-signature/image/upload/v1687256589/lxxanbfrbhgtwazn6zi9.jpg",
//       "state": "Oyo",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687256598/e3njyvodtataxcr4okd3.jpg"
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "649177fd12e866001838e309",
//       "businessName": "",
//       "firstName": "Jim",
//       "lastName": "Ovia",
//       "email": "jim@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "08166245115",
//       "role": "INDIVIDUAL",
//       "otp": null,
//       "createdAt": "2023-06-20T09:57:17.357Z",
//       "updatedAt": "2023-06-20T13:17:17.753Z",
//       "__v": 0,
//       "city": "Ibadan",
//       "country": "NG",
//       "profilePicture": "https://res.cloudinary.com/pebbles-signature/image/upload/v1687256136/wqnzmthnjtdftmj8lqyb.jpg",
//       "state": "Oyo",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687256144/ihnrrctghsmctprcafld.jpg",
//       "companyAddress": "N5/64F Orita Basorun, Ibadan, Oyo State, Nigeria."
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "6490b22412e866001838e257",
//       "businessName": "The Trilogy",
//       "firstName": "Adeola",
//       "lastName": "Amosun",
//       "email": "pebblestouchh@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "pebblestouchh@gmail.com",
//       "role": "BUSINESS",
//       "otp": null,
//       "createdAt": "2023-06-19T19:53:08.362Z",
//       "updatedAt": "2023-06-19T19:54:18.973Z",
//       "__v": 0,
//       "cacDocument": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687204457/rmkmvdxprpuh1o0a06zx.heic",
//       "city": "lagos",
//       "country": "NG",
//       "profilePicture": "https://res.cloudinary.com/pebbles-signature/image/upload/v1687204453/pkbke8zzdzzh75nmbfnq.jpg",
//       "state": "Lagos",
//       "validId": "http://res.cloudinary.com/pebbles-signature/image/upload/v1687204455/cq6rytbjkv2vxdsvokim.heic"
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "6490b0fd12e866001838e23d",
//       "businessName": "",
//       "firstName": "Adeola",
//       "lastName": "Amosun",
//       "email": "adeolaamosun1@gmail.com",
//       "googleSigned": true,
//       "phoneNumber": "07495777475",
//       "role": "INDIVIDUAL",
//       "otp": null,
//       "createdAt": "2023-06-19T19:48:13.823Z",
//       "updatedAt": "2023-06-19T19:48:55.567Z",
//       "__v": 0
//   },
//   {
//       "isVerified": true,
//       "status": "active",
//       "_id": "6490ae3012e866001838e21c",
//       "firstName": "Ezra",
//       "lastName": "Miller",
//       "email": "bensouez112@gmail.com",
//       "phoneNumber": "09135248279",
//       "googleSigned": false,
//       "role": "SUPER-ADMIN",
//       "otp": null,
//       "createdAt": "2023-06-19T19:36:16.867Z",
//       "updatedAt": "2023-06-19T19:36:59.547Z",
//       "__v": 0
//   }
// ]
//   const [, setDetails] = useState([]);
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

  const fetchData = async () => {
    setLoading(true)
    await axios.get(`${api}/users/all`, {
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
  // }, [details]);

console.log(details);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);
  const [option, setOption] = useState({})
  // console.log(option);


  const ref = useRef();

  useOnClickOutside(ref, () => setOption(false));

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }
  for (const key in option) {
    // console.log(key);
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

  const suspendUser = async (e) => {
    setLoading(true)
    e.preventDefault()

    if (window.confirm('Are you sure you want to suspend User?')) {
      await axios.patch(`${api}/admin/suspendhost?id=${id}`, {
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
      await axios.patch(`${api}/admin/verifyhost?id=${id}`, {
        id: id,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          setLoading(false)
          console.log(response);
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
      await axios.delete(`${api}/admin/deleteAccount?id=${id}`, {
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

  const [search, setSearch] = useState('')


  return (
    <>
      <div style={{marginTop: '1rem'}}>
        <Search onChange={(e) => setSearch(e.target.value)} placeholder="Search Users" />
      </div>
      <section className="users">
        <div className="users-list-heading">
          <div>
            <h2>Users</h2>
            <p>List of all Users</p>
          </div>
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
                <tbody key={id}>
                {currentItems.filter((user) => {
                  return search.toLowerCase() === '' ? user : user.firstName.toLowerCase().includes(search)
                }).map((user, id) => {
                  return (
                      <tr key={id}>
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
                          {option[user._id] && <div ref={ref} className='option-details'>
                            <span onClick={viewDetails}>View Details</span>
                            <span onClick={suspendUser}>Suspend</span>
                            <span onClick={verifyUser}>Verify</span>
                            <span onClick={deleteUser}>Delete</span>
                          </div>}
                        </td>
                      </tr>
                  )
                })}
                </tbody>
            </table>
          ) : (
            <h2>{error}</h2>
          )}
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

export default Users;
