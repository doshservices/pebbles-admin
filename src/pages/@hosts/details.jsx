import './host-details.css';
import axios from "axios";
import demoDp from './assets/demo.webp';
// import dropdown from "./assets/dropdown.svg";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from '../../utils/helpers';
import { useState, useEffect } from "react";
import { CssLoader } from '../../components/spinner/spinner';

export default function Details() {

    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated]);

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("");
    // console.log(details);

    const reload = () => {
        window.location.reload()
    }

    const redirect = () => {
        navigate('/hosts')
    }
    const userId = JSON.parse(sessionStorage.getItem('host_un_Id'))

    const api = process.env.REACT_APP_URL

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );

    const fetchData = async () => {
        // setLoading(true)
        await axios.get(`${api}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then((res) => {
                // console.log(res);
                setDetails(res.data.data.user)
            })
            .catch((err) => {
                // setLoading(false)
                // console.log(err);
                // setError(err.message);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    const suspendHost = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to suspend Host?')) {
            await axios.patch(`${api}/admin/suspendhost?id=${userId}`, {
                id: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // console.log(response);
                    setLoading(false)
                    setTimeout(reload, 5000)
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
    }

    const deleteAccount = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (window.confirm('Do you want to delete Host?')) {
            await axios.delete(`${api}/admin/deleteAccount?id=${userId}`, {
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
        setTimeout(redirect, 3000)
    }
    const verifyHost = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to Verify Host?')) {
            await axios.patch(`${api}/admin/verifyhost?id=${userId}`, {
                id: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    setLoading(false)
                    // console.log(response);
                    setTimeout(reload, 5000)
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
    }

    return (
        <section className="host-details">
            <div className="host-details-heading">
                <div>
                    <h2>Host</h2>
                    <p>Host Profile</p>
                </div>
                {/* <div className="host-details-filter">
                    <img className="profile" src="" alt="" />
                    <div>
                        <h5>Filter Period</h5>
                        <p>10 March 2023 - 21 April 2023</p>
                    </div>
                    <img src={dropdown} alt="dropdown" />
                </div> */}
            </div>
            <button className='redirect' onClick={redirect}>Back</button>
            {loading && <CssLoader />}
            <section className="host-details-info">
                <div className="host-details-profile">
                    <img src={details.profilePicture ? details.profilePicture : demoDp} alt="profile" className='profile-pic' />
                    <div>
                        <div className='username'>
                            <h4>{details.firstName ? details.firstName : ''} {details.lastName ? details.lastName : ''}</h4>
                            <div>
                                <button className='action-btn veri' onClick={verifyHost}>Verify</button>
                                <button className='action-btn suspend' onClick={suspendHost}>Suspend</button>
                                <button className='action-btn delete' onClick={deleteAccount}>Delete</button>
                            </div>
                        </div>
                        {details.role && <p className="role">Role: {details.role}</p>}
                        {details.country && <p>Country: {details.country}</p>}
                        {details.state && <p>State: {details.state}</p>}
                        {details.city && <p>City: {details.city}</p>}
                        {details.validId && <img height='200px' src={details.validId} alt="" />}
                        {details.status && <p className="status">Status: {details.status}</p>}
                        <div className="contact">
                            {details.email && <p>{details.email}</p>}
                            {details.phoneNumber && <p>{details.phoneNumber}</p>}
                        </div>
                        {details.isVerified && <p className={details.isVerified === true ? 'verified' : 'pending'}>{details.isVerified === true ? <span>Verified</span> : <span>Pending</span>}</p>}
                    </div>
                </div>
            </section>
        </section>
    )
}