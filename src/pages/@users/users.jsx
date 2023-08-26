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

import TableHead from './table-head';
import TableRow from './table-row';

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
//]

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
  for (let i = 1; i <= 4; i++) {
    pages.push(i);
  }
  // for (let i = 1; i <= Math.ceil(details.length / itemsPerPage); i++) {
  //   pages.push(i);
  // }

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
  // useEffect(() => {
  //   fetchData();
  // }, []);
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

  const [search, setSearch] = useState('');

  const authName = JSON.parse(localStorage.getItem('user-name'))

  return (
    <>
      <section className="users-head">
          <div className="users-heading desktop">
            <div>
              <h2>Users</h2>
            </div>
          </div>
          <div className="search-bar">
            <Search type="search" placeholder="Search" name="search" />
          </div>
        <div className="loggedin-user">
          <div className="notification-bell">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <g clip-path="url(#clip0_2598_13837)">
                <path d="M14 25.666C15.2834 25.666 16.3334 24.616 16.3334 23.3327H11.6667C11.6667 24.616 12.7167 25.666 14 25.666ZM21 18.666V12.8327C21 9.25102 19.0984 6.25268 15.75 5.45935V4.66602C15.75 3.69768 14.9684 2.91602 14 2.91602C13.0317 2.91602 12.25 3.69768 12.25 4.66602V5.45935C8.91335 6.25268 7.00002 9.23935 7.00002 12.8327V18.666L4.66669 20.9993V22.166H23.3333V20.9993L21 18.666ZM18.6667 19.8327H9.33335V12.8327C9.33335 9.93935 11.095 7.58268 14 7.58268C16.905 7.58268 18.6667 9.93935 18.6667 12.8327V19.8327Z" fill="#2D2D2D" fill-opacity="0.7"/>
                <circle cx="20" cy="6" r="6" fill="#155EEF"/>
              </g>
              <defs>
                <clipPath id="clip0_2598_13837">
                  <rect width="28" height="28" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="notification-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M38.5 21.002C38.5 11.3595 30.6425 3.50195 21 3.50195C11.3575 3.50195 3.5 11.3595 3.5 21.002C3.5 26.077 5.6875 30.6444 9.1525 33.8469C9.1525 33.8644 9.1525 33.8645 9.135 33.882C9.31 34.0569 9.52 34.1969 9.695 34.3544C9.8 34.4419 9.8875 34.5294 9.9925 34.5994C10.3075 34.8619 10.6575 35.107 10.99 35.3519C11.1125 35.4394 11.2175 35.5094 11.34 35.597C11.6725 35.8244 12.0225 36.0345 12.39 36.227C12.5125 36.297 12.6525 36.3844 12.775 36.4544C13.125 36.6469 13.4925 36.8219 13.8775 36.9794C14.0175 37.0494 14.1575 37.1194 14.2975 37.1719C14.6825 37.3294 15.0675 37.4694 15.4525 37.5919C15.5925 37.6444 15.7325 37.6969 15.8725 37.7319C16.2925 37.8544 16.7125 37.9594 17.1325 38.0644C17.255 38.0994 17.3775 38.1344 17.5175 38.1519C18.0075 38.2569 18.4975 38.327 19.005 38.3794C19.075 38.3794 19.145 38.3969 19.215 38.4145C19.81 38.4669 20.405 38.5019 21 38.5019C21.595 38.5019 22.19 38.4669 22.7675 38.4145C22.8375 38.4145 22.9075 38.3969 22.9775 38.3794C23.485 38.327 23.975 38.2569 24.465 38.1519C24.5875 38.1344 24.71 38.0819 24.85 38.0644C25.27 37.9594 25.7075 37.8719 26.11 37.7319C26.25 37.6794 26.39 37.6269 26.53 37.5919C26.915 37.4519 27.3175 37.3294 27.685 37.1719C27.825 37.1194 27.965 37.0494 28.105 36.9794C28.4725 36.8219 28.84 36.6469 29.2075 36.4544C29.3475 36.3844 29.47 36.297 29.5925 36.227C29.9425 36.0169 30.2925 35.8244 30.6425 35.597C30.765 35.527 30.87 35.4394 30.9925 35.3519C31.3425 35.107 31.675 34.8619 31.99 34.5994C32.095 34.5119 32.1825 34.4244 32.2875 34.3544C32.48 34.1969 32.6725 34.0394 32.8475 33.882C32.8475 33.8645 32.8475 33.8644 32.83 33.8469C36.3125 30.6444 38.5 26.077 38.5 21.002ZM29.645 29.6994C24.9025 26.5144 17.1325 26.5144 12.355 29.6994C11.585 30.2069 10.955 30.8019 10.43 31.4494C7.77 28.7544 6.125 25.062 6.125 21.002C6.125 12.7945 12.7925 6.12695 21 6.12695C29.2075 6.12695 35.875 12.7945 35.875 21.002C35.875 25.062 34.23 28.7544 31.57 31.4494C31.0625 30.8019 30.415 30.2069 29.645 29.6994Z" fill="#2D2D2D" fill-opacity="0.8"/>
            <path d="M21.0001 12.127C17.3776 12.127 14.4376 15.067 14.4376 18.6895C14.4376 22.242 17.2201 25.1295 20.9126 25.2345C20.9651 25.2345 21.0351 25.2345 21.0701 25.2345C21.1051 25.2345 21.1576 25.2345 21.1926 25.2345C21.2101 25.2345 21.2276 25.2345 21.2276 25.2345C24.7626 25.112 27.5451 22.242 27.5626 18.6895C27.5626 15.067 24.6226 12.127 21.0001 12.127Z" fill="#2D2D2D" fill-opacity="0.8"/>
          </svg>
          </div>
          <div className="loggedin-user-details">
            <div>{authName} Oladimeji</div>
            <div>Personal</div>
          </div>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 15.0004L17 10.0254H7L12 15.0004Z" fill="#2D2D2D"/>
          </svg>
          </div>
        </div>
      </section>
      <section className="users">
        <div className="users-table">
          <div className="users-table-head">
            <TableHead />
          </div>
          <div className="table-head-mb"></div>
          <div className="users-table-body">
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
          </div>
        </div>
          <div className="pagination-div">
            <div>
              Showing 10 out of 40
            </div>
            <div>
              {renderData(currentItems)}
              <ul className="pageNumbers users-pagination">
                <button className="pagination-nav-button prev" onClick={handlePrevbtn} disabled={currentPage === 1} >
                  <img
                    // disabled={currentPage == pages[0] ? true : false} src={left} alt="left" />
                    src={left} alt="left" />
                </button>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <button className="pagination-nav-button next" onClick={handleNextbtn} disabled={currentPage === 4}>
                  <img
                    // disabled={currentPage == pages[pages.length - 1] ? true : false} src={right} alt="right" />
                     src={right} alt="right" />
                </button>
              </ul>
            </div>
          </div>
      </section>
    </>
  );
};

export default Users;


// eslint-disable-next-line no-lone-blocks
{/* <section className="table-section">
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
        } */}
