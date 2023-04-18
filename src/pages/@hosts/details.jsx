import './host-details.css';
import axios from "axios";
import dropdown from "./assets/dropdown.svg";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from '../../utils/helpers';
import { useState, useEffect } from "react";

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
    const [error, setError] = useState("");
    console.log(details);

    const userId = JSON.parse(sessionStorage.getItem('ind_un_Id'))
    console.log(userId);

    const api = 'https://pubblessignature-production.up.railway.app/api/users/';
    const userDetails = `${api}${userId}`
    console.log(userDetails);

    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );

    const fetchData = async () => {
        setLoading(true)
        await axios.get(userDetails, {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then((res) => {
                setLoading(false)
                console.log(res);
                setDetails(res.data.data.user)
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
    return (
        <section className="host-details">
            <div className="host-details-heading">
                <div>
                    <h2>User</h2>
                    <p>User Profile</p>
                </div>
                <div className="host-details-filter">
                    <img className="profile" src="" alt="" />
                    <div>
                        <h5>Filter Period</h5>
                        <p>10 March 2023 - 21 April 2023</p>
                    </div>
                    <img src={dropdown} alt="dropdown" />
                </div>
            </div>
            <section className="host-details-info">
                <div className="host-details-profile">
                    <img src='' alt="profile" />
                    <div>
                        <div>
                            <h4>{details.firstName ? details.firstName : ''} {details.lastName ? details.lastName : ''}</h4>
                        </div>
                        <p className="member">{details.role ? details.role : ''}</p>
                        <p className="address">
                            {details.status ? details.status : ''}
                        </p>
                        <div className="contact">
                            <p>{details.email ? details.email : ''}</p>
                            <p>{details.phoneNumber ? details.phoneNumber : ''}</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}