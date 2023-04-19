import { useEffect, useState } from "react";
import axios from "axios";
import { RespLoader } from "../../spinner/spinner";

const TotalBookings = () => {
    const [details, setDetails] = useState([]);
    const [apiError, setApiError] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const buisLength = details.length;

    const totalBookings =
        "https://pubblessignature-production.up.railway.app/api/bookings/all-bookings";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        setIsLoading(true)
        await axios
            .get(totalBookings, {
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
                setApiError(err.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {isloading ? <RespLoader /> : <>
                {buisLength > 0 ? <p>{buisLength}</p> : <p>{apiError}</p>}
            </>}
            <p>Total Bookings</p>
        </div>
    )
}
export default TotalBookings;