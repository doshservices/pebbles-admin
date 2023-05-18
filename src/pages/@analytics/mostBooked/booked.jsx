import axios from "axios";
import { CssLoader } from "../../../components/spinner/spinner";
import { useState, useEffect } from "react";

export const MostBooked = () => {
    const [loading, setLoading] = useState(false)
    const [mostBooked, setMostBooked] = useState([]);
    // console.log(mostBooked);
    const [error, setError] = useState('')
    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );

    const api = process.env.REACT_APP_URL
    const fetchListing = async () => {
        setLoading(true)
        setLoading(true)
        await axios
            .get(`${api}/bookings/most-booked`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setMostBooked(res.data.data.bookings);
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err);
                setError(err.message);
            });
    };
    useEffect(() => {
        fetchListing();
    }, []);

    return (
        <div>
            {loading && <CssLoader />}
            <section>
            </section>
        </div>
    )
}