import { useEffect, useState } from "react";
import axios from "axios";

const TotalBookings = () => {
    const [details, setDetails] = useState([]);
    // console.log(details);
    const [apiError, setApiError] = useState("");
    // console.log(apiError);
    //length of all bookings
    const buisLength = details.length;
    // console.log(buisLength);

    const totalBookings =
        "https://pubblessignature-production.up.railway.app/api/bookings/all-bookings";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        await axios
            .get(totalBookings, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                console.log(res);
                setDetails(res.data.message);
            })
            .catch((err) => {
                console.log(err);
                setApiError(err.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {buisLength > 0 ? <p>{buisLength}</p> : <p>0</p>}
            <p>Total Bookings</p>
        </div>
    )
}
export default TotalBookings