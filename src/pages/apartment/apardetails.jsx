import { Search } from "../../components/search/search"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";
import axios from "axios";
import './apartment.css';
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import { CssLoader } from "../../components/spinner/spinner";

const ApartmentDetails = () => {
    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    console.log(details);

    const aparId = JSON.parse(sessionStorage.getItem("apar_un_Id"));
    // console.log(aparId);
    const apartmentDetails =
        "https://pubblessignature-production.up.railway.app/api/apartments/";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        setLoading(true)
        await axios
            .get(`${apartmentDetails}${aparId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false)
                console.log(res);
                setDetails(res.data.data.apartment);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
                setError(err.response.data.message);
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
        <section className="apartment-details">
            <p>{details.address}</p>
            <p>{details.apartmentCountry}</p>
            <p>{details.apartmentInfo}</p>
            <p>{details.apartmentName}</p>
            <p>{details.apartmentState}</p>
            <p>{details.latitude}</p>
            <p>{details.longitude}</p>
            <p>{details.price}</p>
            <p>{details.status}</p>
            <p>{details.typeOfApartment}</p>
            <p>{details.numberOfBedrooms}</p>
            <p>{details.numberOfGuests}</p>
            <p>{details.numberOfToilets}</p>
            {/* <p>{details.}</p> */}
        </section>
    )

}
export default ApartmentDetails;