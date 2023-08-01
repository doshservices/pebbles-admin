import { useEffect, useState } from "react";
import axios from "axios";

const TotalBookings = () => {
    const [details, setDetails] = useState([]);
    const [apiError, setApiError] = useState("");
    console.log(apiError);
    const [isloading, setIsLoading] = useState(false);
    const buisLength = details.length;

    const totalBookings = process.env.REACT_APP_URL;
    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );
    const fetchData = async () => {
        setIsLoading(true)
        await axios
            .get(`${totalBookings}/bookings/all-bookings`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setIsLoading(false)
                // console.log(res);
                setDetails(res.data.message);
            })
            .catch((err) => {
                setIsLoading(false)
                // console.log(err);
                setApiError(err.response.data.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {buisLength > 0 ? <p>{buisLength}</p> : <p>{apiError}</p>}
            <p>Total Bookings</p>
        </div>
    )
}
export default TotalBookings;