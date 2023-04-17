import { Search } from "../../components/search/search";
import './host.css';
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import demoDp from './assets/demo.webp';
import axios from "axios";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

export const Buisness = () => {
    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const buisness = 'https://pubblessignature-production.up.railway.app/api/admin/allbusiness';
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    console.log(details);

    const fetchData = async () => {
        setLoading(true)
        await axios.get(buisness, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then((res) => {
                setLoading(false)
                console.log(res);
                setDetails(res.data.data.businessHost)
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

    const handleClick = (data) => {
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
            <section className="buisness-host">
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
                                        <span>Name</span>
                                        <img src={expand} alt="expand" />
                                    </th>
                                    {/* <th>
                                        <span>State</span> <img src={expand} alt="expand" />
                                    </th>
                                    <th>
                                        <span>City</span> <img src={expand} alt="expand" />
                                    </th> */}
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
                            {details.map((buisnesshost, id) => {
                                return (
                                    <tbody key={id}>
                                        <tr>
                                            <td>
                                                <img height='40px' src={buisnesshost.profilePicture ? buisnesshost.profilePicture : demoDp} alt="profile-photo" className="demo-dp" />
                                            </td>
                                            <td>{buisnesshost.firstName ? buisnesshost.firstName : 'N/A'} {buisnesshost.lastName ? buisnesshost.lastName : 'N/A'}</td>
                                            {/* <td>{buisnesshost.city ? buisnesshost.city : 'N/A'}</td> */}
                                            {/* <td>{buisnesshost.state ? buisnesshost.state : 'N/A'}</td> */}
                                            <td>{buisnesshost.email ? buisnesshost.email : 'N/A'}</td>
                                            <td>{buisnesshost.phoneNumber ? buisnesshost.phoneNumber : 'N/A'}</td>
                                            <td>{buisnesshost.role ? buisnesshost.role : 'N/A'}</td>
                                            <td>{buisnesshost.status ? buisnesshost.status : 'N/A'}</td>
                                            <td className="options" onClick={(e) => handleClick(e, buisnesshost)}>
                                                <img src={options} alt="options" />
                                                {option[buisnesshost._id] && <div className='option-details'>
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
                        <h2>No users Business Host Found</h2>
                    )}
                </section>
            </section>
        </>
    )
}