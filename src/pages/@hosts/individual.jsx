// import { Search } from "../../components/search/search";
import './host.css';
// import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import demoDp from './assets/demo.webp';
import axios from "axios";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";

export const Individual = () => {
    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const users = 'https://pubblessignature-production.up.railway.app/api/admin/allindividual';
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    // console.log(details);

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

    const handleClick = (e, data) => {
        const update = { ...option }
        update[data._id] = !option[data._id]
        setOption(update)
    };
    const viewDetails = () => {
        navigate('/host-details')
    }

    const id = JSON.parse(sessionStorage.getItem('host_un_Id'))
    const api = `'https://pubblessignature-production.up.railway.app/api/admin/suspendhost?id=${id}'`
    console.log(api);

    const suspendHost = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        }
        if (window.confirm('Are you sure you want to suspend Host?')) {
            try {
                const response = await axios.patch(api, { headers })
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
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
                                        <img src={expand} alt="expand" />
                                    </th>
                                    <th>
                                        <span>Name</span>
                                        <img src={expand} alt="expand" />
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
                            {details.map((user, id) => {
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
                                            <td className="options" onClick={(e) => handleClick(e, user)}>
                                                <img src={options} alt="options" />
                                                {option[user._id] && <div className='option-details'>
                                                    <span onClick={viewDetails}>View Details</span><span onClick={suspendHost}>Suspend</span>
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
            </section>
        </>
    )
}