import { Search } from "../../components/search/search"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";
import axios from "axios";
import './apartment.css';
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import { CssLoader } from "../../components/spinner/spinner";

const Apartment = () => {
    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    // console.log(details);

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
    // const hostId = JSON.parse(sessionStorage.getItem('apar_un_Id'))
    // console.log(hostId);
    const suspendApartment = () => {
        // const buisness = 'https://pubblessignature-production.up.railway.app/api/verifyhost?id='
        // const api = `${buisness}${hostId}`
        // console.log(api);
    }
    // const deleteApartment = () => {
    // const buisness = 'https://pubblessignature-production.up.railway.app/api/verifyhost?id='
    // const api = `${buisness}${hostId}`
    // console.log(api);
    // }

    return (
        <>
            <Search placeholder="Search here" />
            <section className="apartment">
                <div className="apartment-heading">
                    <div>
                        <h2>Apartment List</h2>
                        <p>This is your apartment list data</p>
                    </div>
                    <button>
                        <span>Filter</span>
                        <img src={dropdown} alt="dropdown" />
                    </button>
                </div>
                <section className="table-section">
                    <p>{error.message}</p>
                    {loading && <CssLoader />}
                    {details?.length > 0 ? (
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
                            <tbody>
                                {details.map((detail, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{detail.apartmentName ? detail.apartmentName : 'N/A'}</td>
                                            <td>{detail.apartmentCountry ? detail.apartmentCountry : 'N/A'}</td>
                                            <td>{detail.apartmentState ? detail.apartmentState : 'N/A'}</td>
                                            <td>{detail.address ? detail.address : 'N/A'}</td>
                                            <td>{detail.typeOfApartment ? detail.typeOfApartment : 'N/A'}</td>
                                            <td className='status'>{detail.status ? detail.status : 'N/A'}</td>
                                            <td className="options" onClick={(e) => handleClick(e, detail)}>
                                                <img src={options} alt="options" />
                                                {option[detail._id] && <div className='option-details'>
                                                    <span onClick={viewDetails}>View Details</span><span onClick={suspendApartment}>Suspend</span>
                                                </div>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>) : (<h2>{error}</h2>)
                    }
                </section>
            </section>
        </>
    )
}

export default Apartment