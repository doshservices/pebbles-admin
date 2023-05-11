import { useEffect, useState } from "react";
import axios from "axios";

const TotalHosts = () => {
    const [details, setDetails] = useState([]);
    const [resp, setResp] = useState([])
    const [apiError, setApiError] = useState("");
    const totalHosts = details.length + resp.length;

    const hosts = process.env.REACT_APP_URL;

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );

    const fetchIndividualData = async () => {
        await axios
            .get(`${hosts}/admin/allindividual`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setDetails(res.data.data.individualHost);
            })
            .catch((err) => {
                // console.log(err);
                setApiError(err.message);
            });
    };

    const fetchBuisnessData = async () => {
        await axios
            .get(`${hosts}/admin/allbusiness`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setResp(res.data.data.businessHost);
            })
            .catch((err) => {
                // console.log(err);
                setApiError(err.message);
            });
    };
    useEffect(() => {
        fetchIndividualData();
        fetchBuisnessData()
    }, []);

    return (
        <div>
            {totalHosts > 0 ? <p>{totalHosts}</p> : <p>{apiError}</p>}
            <p>Total Hosts</p>
        </div>
    )
}
export default TotalHosts;