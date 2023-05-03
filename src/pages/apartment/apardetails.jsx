import { Search } from "../../components/search/search"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";
import axios from "axios";
import './apardetails.css';

const ApartmentDetails = () => {
    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    const [details, setDetails] = useState([]);
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("");
    // console.log(details);

    const aparId = JSON.parse(sessionStorage.getItem("apar_un_Id"));
    // console.log(aparId);
    const apartmentDetails =
        "https://pubblessignature-production.up.railway.app/api/apartments/";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        // setLoading(true)
        await axios
            .get(`${apartmentDetails}${aparId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                // setLoading(false)
                // console.log(res);
                setDetails(res.data.data.apartment);
            })
            .catch((err) => {
                // setLoading(false)
                // console.log(err);
                // setError(err.response.data.message);
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
        <>
            <Search placeholder='search here' />
            <section className="apartment-details">
                <section className="images">
                    <h3>Apartment Images</h3>
                    <div>
                        {details.apartmentImages?.map((img, index) => {
                            return (
                                <figure key={index}>
                                    <img src={img} />
                                </figure>
                            );
                        })}
                    </div>
                </section>
                <section className="details">
                    <h3>Apartment Details</h3>
                    <div style={{ margin: '1rem 0' }}>
                        <p><span>Name: </span> {details.apartmentName}</p>
                        <p><span>Apartment Type:</span> {details.typeOfApartment}</p>
                        <p><span>Address: </span> {details.address}</p>
                        <p><span>Country: </span> {details.apartmentCountry}</p>
                        <p><span>State: </span> {details.apartmentState}</p>
                        <p><span>Status: </span>  {details.status}</p>
                        <p><span>Price:</span> {details.price}</p>
                        <p><span>Number of Bedrooms:</span> {details.numberOfBedrooms}</p>
                        <p><span>Number of Guests:</span> {details.numberOfGuests}</p>
                        <p><span>Number of Toilets:</span> {details.numberOfToilets}</p>
                        <p><span>Apartment Info:</span> {details.apartmentInfo}</p>
                        <p>{details.isAvailable === true ? 'Available' : 'Not Available'}</p>
                        <h4>Facilities</h4>
                        {
                            details.facilities?.map((img, index) => {
                                return (
                                    <p key={index}>{img}</p>
                                )
                            })
                        }
                    </div>
                </section>
            </section>
        </>
    )

}
export default ApartmentDetails;