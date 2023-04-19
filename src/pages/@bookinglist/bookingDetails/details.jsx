import axios from "axios"
import { useEffect } from "react";
import { isAuthenticated } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {

    const authenticated = isAuthenticated();
    const navigate = useNavigate()

    // const [details, setDetails] = useState([]);
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("");
    // console.log(error);
    const unId = JSON.parse(sessionStorage.getItem('detail_un_id'))
    // console.log(unId);

    const bookingDetail =
        `"https://pubblessignature-production.up.railway.app/api/bookings/${unId}"`;
    console.log(bookingDetail);
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        // setLoading(true)
        await axios
            .get(bookingDetail, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // setLoading(false)
                // console.log(res);
                // setDetails(res.data.message);
            })
            .catch((err) => {
                // setLoading(false)
                // console.log(err);
                // setError(err.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated]);
    return (
        <section>Hello  </section>
    )
}
export default BookingDetails;