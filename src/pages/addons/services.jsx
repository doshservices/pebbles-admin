import './addon.css';
import axios from 'axios';
import { Search } from '../../components/search/search';
import { CssLoader } from '../../components/spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const Services = () => {

    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const [addon, setAddon] = useState([])
    // console.log(events);
    const [loading, setLoading] = useState(false)
    const api = process.env.REACT_APP_URL

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );

    const getEvents = async () => {
        setLoading(true)
        await axios
            .get(`${api}/api/addons/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setAddon(res.data.data.addOns);
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err);
                // setError(err.response.data.message);
            });
    };
    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated]);

    return (
        <>
            <Search placeholder='Search' />
            <section className="addons">
                <h2>Services</h2>
                {loading && <CssLoader />}
                {addon.map((addons, id) => {
                    return (
                        <div key={id} className='addon'>
                            {addons.serviceType && <h3><span>Service Type: </span>{addons.serviceType}</h3>}
                            {addons.address && <p><span>Address: </span>{addons.address}</p>}
                            {addons.createdAt && <p><span>Created at: </span>{addons.createdAt}</p>}
                            {addons.serviceDuration && <p><span>Duration: </span>{addons.serviceDuration}</p>}
                            {addons.status && <p><span>Status: </span>{addons.status}</p>}
                            {addons.carAmenities && <p><span>Car Amenities: </span>{addons.carAmenities}</p>}
                            {addons.destination && <p><span>Destination: </span>{addons.destination}</p>}
                            {addons.pickUpDate && <p><span>Pick up date: </span>{addons.pickUpDate}</p>}
                            {addons.pickUpTime && <p><span>Pick up time: </span>{addons.pickUpTime}</p>}
                            {addons.amenities.length > 0 ?
                                <div>
                                    <h4>Ameneties</h4>
                                    {addons.amenities.map((amenities, index) => {
                                        return (
                                            <p key={index}>{amenities}</p>
                                        )
                                    })}
                                </div> : ''
                            }
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default Services;