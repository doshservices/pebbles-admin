import { useState, useEffect } from "react";
import axios from "axios";
import { CssLoader } from "../../../components/spinner/spinner";

export const MostBooked = () => {
    const [loading, setLoading] = useState(false)
    const [mostBooked, setMostBooked] = useState([]);
    console.log(mostBooked);
    const [error, setError] = useState('')
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );

    const mostBookedListing =
        "https://pubblessignature-production.up.railway.app/api/bookings/most-booked";
    const fetchListing = async () => {
        setLoading(true)
        setLoading(true)
        await axios
            .get(mostBookedListing, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                console.log(res);
                setMostBooked(res.data.data.bookings);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
                setError(err.message);
            });
    };
    useEffect(() => {
        fetchListing();
    }, []);

    return (
        <div className="analytics-category-type">
            <h3>Most Booked Listings </h3>
            {loading && <CssLoader />}
            <section>
            </section>
        </div>
    )
}