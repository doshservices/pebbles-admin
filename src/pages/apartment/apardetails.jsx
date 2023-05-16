import './apardetails.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { Search } from "../../components/search/search"
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers";
import { useState, useEffect } from "react";

const ApartmentDetails = () => {
    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("");
    // console.log(details);

    const aparId = JSON.parse(sessionStorage.getItem("apar_un_Id"));
    // console.log(aparId);
    const api = process.env.REACT_APP_URL

    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );
    const fetchData = async () => {
        // setLoading(true)
        await axios
            .get(`${api}/apartments/${aparId}`, {
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

    const reload = () => {
        window.location.reload()
    }

    const suspendApartment = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (window.confirm('Are you sure you want to suspend Apartment?')) {
            await axios.patch(`${api}/admin/suspendApartment?apartmentId=${aparId}`, {
                id: aparId,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // console.log(response);
                    setLoading(false)
                    setTimeout(reload, 5000)
                    toast.success("Apartment Suspended", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                })
                .catch(error => {
                    setLoading(false)
                    // console.error(error);
                    toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
        }
    }


    return (
        <>
            <Search placeholder='search here' />
            <section className="apartment-details">
                <section className="images">
                    <button className='action-btn suspend' onClick={suspendApartment}>Suspend</button>
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