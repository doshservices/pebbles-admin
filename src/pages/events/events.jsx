import './events.css';
import axios from 'axios';
import AddEvent from './addEvent';
import { Search } from '../../components/search/search';
import { CssLoader } from '../../components/spinner/spinner';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const Events = () => {
    const navigate = useNavigate()
    const authenticated = isAuthenticated();

    const [tab, setTab] = useState(1)

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );

    const api = process.env.REACT_APP_URL


    const getEvents = async () => {
        setLoading(true)
        await axios
            .get(`${api}/api/events`, {
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
                setError(err.response.data.message);
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
                {loading && <CssLoader />}
                {events > 0 ?
                    <>
                        <div className="events-heading">
                            <button className={tab === 1 ? 'events-active' : ''} onClick={() => setTab(1)}>List of all Events</button>
                            <button className={tab === 2 ? 'events-active' : ''} onClick={() => setTab(2)}>Add Event</button>
                        </div>

                        {tab === 1 &&
                            <>{events.map((allEvents, id) => {
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
                            })}</>
                        }
                    </> : <h3>{error}</h3>
                }
                {tab === 2 && <AddEvent />}
            </section >
        </>
    )
}
export default Events
