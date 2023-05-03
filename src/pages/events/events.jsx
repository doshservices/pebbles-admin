import './events.css';
import axios from 'axios';
import { Search } from '../../components/search/search';
import { CssLoader } from '../../components/spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const Events = () => {
    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const [events, setEvents] = useState([])
    // console.log(events);
    const [loading, setLoading] = useState(false)
    const api =
        "https://pubblessignature-production.up.railway.app/api/events/";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );

    const getEvents = async () => {
        setLoading(true)
        await axios
            .get(api, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setEvents(res.data.data);
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
            <Search placeholder='Search Events' />
            <section className="events">
                <h2>Events</h2>
                <p>List of all Events</p>
                {loading && <CssLoader />}
                {events.map((allEvents, id) => {
                    return (
                        <div key={id} className='event'>
                            {allEvents.eventName && <h3><span>Event Name: </span>{allEvents.eventName}</h3>}
                            {allEvents.description && <p><span>Description: </span>{allEvents.description}</p>}
                            {allEvents.eventCategory && <p><span>Category: </span>{allEvents.eventCategory}</p>}
                            {allEvents.eventCountry && <p><span>Country: </span>{allEvents.eventCountry}</p>}
                            {allEvents.eventState && <p><span>State: </span>{allEvents.eventState}</p>}
                            {allEvents.eventDate && <p><span>Date: </span>{allEvents.eventDate}</p>}
                            {allEvents.eventTime && <p><span>Time: </span>{allEvents.eventTime}</p>}
                            {allEvents.eventLocation && <p><span>Location: </span>{allEvents.eventLocation}</p>}
                            {allEvents.eventCost && <p><span>Event Cost: </span>{allEvents.eventCost}</p>}
                            <p>{allEvents.isAvailable === true ? 'Available' : 'Unavailable'}</p>
                            {allEvents.eventImages.map((imgs, index) => {
                                return (
                                    <figure key={index}>
                                        <img src={imgs} alt="event images" />
                                    </figure>
                                )
                            })}
                        </div>
                    )
                })}
            </section>
        </>
    )
}
export default Events