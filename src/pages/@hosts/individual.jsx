import './host.css';
import left from '../@bookinglist/assets/left.svg';
import right from '../@bookinglist/assets/right.svg';
import axios from "axios";
// import expand from "./assets/expand.svg";
import demoDp from './assets/demo.webp';
import options from "./assets/options.svg";
import { toast } from 'react-toastify';
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

export const Individual = ({ search }) => {
    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );
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

    const api = process.env.REACT_APP_URL


    const fetchData = async () => {
        setLoading(true)
        await axios.get(`${api}/admin/allindividual`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setDetails(res.data.data.individualHost)
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
        // console.log(key);
        sessionStorage.setItem("host_un_Id", JSON.stringify(key));
    }


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

    const handleClick = (e, data) => {
        const update = { ...option }
        update[data._id] = !option[data._id]
        setOption(update)
    };
    const viewDetails = () => {
        navigate('/host-details')
    }

    const id = JSON.parse(sessionStorage.getItem('host_un_Id'))

    const suspendHost = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to suspend Host?')) {
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
                    toast.success("Host Suspended", {
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
    const verifyHost = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to Verify Host?')) {
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
                    // console.log(response);
                    toast.success("Host Verified", {
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
    const deleteAccount = async (e) => {
        e.preventDefault()
        // console.log(authToken)
        setLoading(true)
        if (window.confirm('Do you want to delete Host?')) {
            await axios.delete(`${api}/admin/deleteAccount?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // console.log(response);
                    setLoading(false)
                    toast.success("Host Deleted!", {
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

    return (
        <>
            <section className="individual-host">
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
                                        <span>Verification</span>
                                    </th>
                                    <th>
                                        <span>Options</span>
                                    </th>
                                </tr>
                            </thead>
                            {details.filter((user) => {
                                return search.toLowerCase() === '' ? user : user.firstName.toLowerCase().includes(search)
                            }).map((user, id) => {
                                return (
                                    <tbody key={id}>
                                        <tr>
                                            <td>
                                                <img height='40px' src={user.profilePicture ? user.profilePicture : demoDp} alt="profile" className="demo-dp" />
                                            </td>
                                            <td>{user.firstName ? user.firstName : 'N/A'} {user.lastName ? user.lastName : 'N/A'}</td>
                                            <td>{user.email ? user.email : 'N/A'}</td>
                                            <td>{user.phoneNumber ? user.phoneNumber : 'N/A'}</td>
                                            <td>{user.role ? user.role : 'N/A'}</td>
                                            <td>{user.status ? user.status : 'N/A'}</td>
                                            <td><span className={user.isVerified === true ? 'verified' : 'pending'}>{user.isVerified === true ? 'Verified' : 'Pending'}</span></td>
                                            <td className="options" onClick={(e) => handleClick(e, user)}>
                                                <img src={options} alt="options" />
                                                {option[user._id] && <div ref={ref} className='option-details'>
                                                    <span onClick={viewDetails}>View Details</span>
                                                    <span onClick={suspendHost}>Suspend</span>
                                                    <span onClick={verifyHost}>Verify</span>
                                                    <span onClick={deleteAccount}>Delete Host</span>
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
    )
}