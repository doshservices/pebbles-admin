import { useEffect, useState } from "react";
import axios from "axios";
import { RespLoader } from "../../spinner/spinner";

const TotalHosts = () => {
    const [details, setDetails] = useState([]);
    const [resp, setResp] = useState([])
    // console.log(resp);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const totalHosts = details.length + resp.length;

    const totalBiusnessHosts =
        "https://pubblessignature-production.up.railway.app/api/bookings/all-bookings";
    const individualHosts =
        "https://pubblessignature-production.up.railway.app/api/admin/allindividual";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchIndividualData = async () => {
        setLoading(true)
        await axios
            .get(totalBiusnessHosts, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                // console.log(res);
                setDetails(res.data.message);
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err);
                setApiError(err.message);
            });
    };
    const fetchBuisnessData = async () => {
        await axios
            .get(individualHosts, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // console.log(res);
                setResp(res.data.data.individualHost);
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
            <RespLoader />
            {loading ? <RespLoader /> : <>{totalHosts > 0 ? <p>{totalHosts}</p> : <p>{apiError}</p>}</>}
            <p>Total Hosts</p>
        </div>
    )
}
export default TotalHosts;