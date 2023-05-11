import { useEffect, useState } from "react";
import axios from "axios";

const Revenue = () => {
    // const [details, setDetails] = useState([]);
    const [apiError, setApiError] = useState("");

    const revenue = process.env.REACT_APP_URL
    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );
    const fetchData = async () => {
        await axios
            .get(`${revenue}/transactions`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // console.log(res);
                // setDetails(res.data.message);
            })
            .catch((err) => {
                // console.log(err);
                setApiError(err.response.data.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {apiError ? <p style={{ fontSize: '.9rem' }}>{apiError}</p> : 'Not Found'}
            <p>Total Revenue</p>
        </div>
    )
}

export default Revenue;