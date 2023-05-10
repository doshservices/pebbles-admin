import './apartment.css';
import left from '../@bookinglist/assets/left.svg';
import right from '../@bookinglist/assets/right.svg';
import axios from "axios";
// import expand from "./assets/expand.svg";
import options from "./assets/options.svg";
import { toast } from "react-toastify";
import { Search } from "../../components/search/search";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect, useRef } from "react";

const renderData = (data) => {
    return (
        <ul>
            {data.map((todo, index) => {
                return <li key={index}>{todo.title}</li>
            })}
        </ul>
    );
};

const Apartment = () => {
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

    const totalBookings =
        "https://pubblessignature-production.up.railway.app/api/apartments/all-apartments";
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
                setDetails(res.data.data.apartments);
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err);
                setError(err.response.data.message);
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
    // console.log(option);
    for (const key in option) {
        // console.log(key);
        sessionStorage.setItem("apar_un_Id", JSON.stringify(key));
    }

    const handleClick = (e, data) => {
        const update = { ...option }
        update[data._id] = !option[data._id]
        setOption(update)
    };
    const viewDetails = () => {
        navigate('/apartment-details')
    }
    const id = JSON.parse(sessionStorage.getItem('apar_un_Id'))
    const api = 'https://pubblessignature-production.up.railway.app/api/admin/'

    const suspendApartment = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to suspend Apartment?')) {
            await axios.patch(`${api}suspendApartment?apartmentId=${id}`, {
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
                    toast.success("Apartment Suspended", {
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
            <Search onChange={(e) => setSearch(e.target.value)} placeholder="Search Apartment" />
            <section className="apartment">
                <div className="apartment-heading">
                    <div>
                        <h2>Apartment List</h2>
                        <p>This is your apartment list data</p>
                    </div>
                </div>
                <section className="table-section">
                    <p>{error.message}</p>
                    {loading && <CssLoader />}
                    {details ?
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <span>Apartment Name</span>

                                    </th>
                                    <th>
                                        <span>Country</span>
                                    </th>
                                    <th>
                                        <span>State</span>
                                    </th>
                                    <th>
                                        <span>Address</span>
                                    </th>
                                    <th>
                                        <span>Type</span>
                                    </th>
                                    <th>
                                        <span>Status</span>
                                    </th>
                                    <th>
                                        <span>Options</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.filter((detail) => {
                                    return search.toLowerCase() === '' ? detail : detail.apartmentName.toLowerCase().includes(search)
                                }).map((detail, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{detail.apartmentName ? detail.apartmentName : 'N/A'}</td>
                                            <td>{detail.apartmentCountry ? detail.apartmentCountry : 'N/A'}</td>
                                            <td>{detail.apartmentState ? detail.apartmentState : 'N/A'}</td>
                                            <td>{detail.address ? detail.address : 'N/A'}</td>
                                            <td>{detail.typeOfApartment ? detail.typeOfApartment : 'N/A'}</td>
                                            <td><span className={detail.status === 'ACTIVE' ? 'act' : 'sus'}>{detail.status ? detail.status : 'N/A'}</span></td>
                                            <td className="options" onClick={(e) => handleClick(e, detail)}>
                                                <img src={options} alt="options" />
                                                {option[detail._id] && <div ref={ref} className='option-details'>
                                                    <span onClick={viewDetails}>View Details</span><span onClick={suspendApartment}>Suspend</span>
                                                </div>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table> : <h2>No booking list found</h2>
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
    )
}

export default Apartment