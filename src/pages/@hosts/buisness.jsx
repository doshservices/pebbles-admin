import './host.css';
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import demoDp from './assets/demo.webp';
import axios from "axios";
import { CssLoader } from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

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
    // console.log(details);

    const fetchData = async () => {
        setLoading(true)
        await axios.get(buisness, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setDetails(res.data.data.businessHost)
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
    const api = 'https://pubblessignature-production.up.railway.app/api/admin/'

    const suspendHost = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to suspend Host?')) {
            await axios.patch(`${api}suspendhost?id=${id}`, {
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
        setLoading(true)
        if (window.confirm('Do you want to delete Host?')) {
            await axios.delete(`${api}deleteAccount?id=${id}`, {
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
                                        <span>Verification</span> <img src={expand} alt="expand" />
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
                                                <img height='40px' src={buisnesshost.profilePicture ? buisnesshost.profilePicture : demoDp} alt="profile" className="demo-dp" />
                                            </td>
                                            <td>{buisnesshost.firstName ? buisnesshost.firstName : 'N/A'} {buisnesshost.lastName ? buisnesshost.lastName : 'N/A'}</td>
                                            <td>{buisnesshost.email ? buisnesshost.email : 'N/A'}</td>
                                            <td>{buisnesshost.phoneNumber ? buisnesshost.phoneNumber : 'N/A'}</td>
                                            <td>{buisnesshost.role ? buisnesshost.role : 'N/A'}</td>
                                            <td>{buisnesshost.status ? buisnesshost.status : 'N/A'}</td>
                                            <td><span className={buisnesshost.isVerified === true ? 'verified' : 'pending'}>{buisnesshost.isVerified === true ? 'Verified' : 'Pending'}</span></td>
                                            <td className="options" onClick={(e) => handleClick(e, buisnesshost)}>
                                                <img src={options} alt="options" />
                                                {option[buisnesshost._id] && <div className='option-details'>
                                                    <span onClick={viewDetails}>View Details</span>
                                                    <span onClick={suspendHost}>Suspend</span>
                                                    <span onClick={verifyHost}>Verify</span>
                                                    <span onClick={deleteAccount}>Delete Host</span>
                                                </div>
                                                }
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