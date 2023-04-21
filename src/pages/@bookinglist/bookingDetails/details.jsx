import "./details.css";
import logo from "./assets/booking.svg";
import axios from "axios";
import scroller from "./assets/scroller.svg";
import { Search } from "../../../components/search/search";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/helpers";
import { Fragment, useEffect, useState } from "react";

export const Info = (props) => {
    return (
        <div style={{ flexBasis: "150px", margin: "1rem 0" }}>
            <h4>{props.head}</h4>
            <p>{props.paragraph}</p>
        </div>
    );
};

const ScrollBtn = (props) => {
    return (
        <img src={scroller} className={props.className} onClick={props.onClick} />
    );
};

const BookingDetails = () => {
    const authenticated = isAuthenticated();
    const navigate = useNavigate();

    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // console.log(details, error);
    const unId = JSON.parse(sessionStorage.getItem("book_un_Id"));

    const bookingDetail =
        "https://pubblessignature-production.up.railway.app/api/bookings/";
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );

    const fetchData = async () => {
        setLoading(true);
        await axios
            .get(`${bookingDetail}${unId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setLoading(false);
                // console.log(res);
                setDetails(res.data.data.booking);
            })
            .catch((err) => {
                setLoading(false);
                // console.log(err);
                setError(err.message);
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

    let slider = document.getElementById("images-row");

    const slideLeft = () => {
        slider.scrollLeft = slider.scrollLeft - 800;
    };

    const slideRight = () => {
        slider.scrollLeft = slider.scrollLeft + 800;
    };

    return (
        <Fragment>
            <Search placeholder="Search here" />
            <section className="booking-details">
                <h2>Booking details</h2>
                <section className="info">
                    <div className="owner-info">
                        <h3>Apartment Owner</h3>
                        <div>
                            <img src={logo} className="logo" alt="" />
                            <div>
                                <h4>Name</h4>
                                <p>
                                    {details.apartmentOwnerId?.firstName}{" "}
                                    {details.apartmentOwnerId?.lastName}
                                </p>
                            </div>
                            <div>
                                <h4>Role</h4>
                                <p>{details.apartmentOwnerId?.role}</p>
                            </div>
                            <div>
                                <h4>Status</h4>
                                <p>{details.apartmentOwnerId?.status}</p>
                            </div>
                            <div>
                                <h4>Phone</h4>
                                <p>{details.apartmentOwnerId?.phoneNumber}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{details.apartmentOwnerId?.email}</p>
                            </div>
                        </div>
                    </div>
                    {details.apartmentId?.apartmentImages && (
                        <section style={{ position: "relative" }}>
                            <div id="images-row" className="images">
                                {details.apartmentId?.apartmentImages.map((img, index) => {
                                    return (
                                        <figure key={index}>
                                            <img src={img} />
                                        </figure>
                                    );
                                })}
                            </div>
                            {details.apartmentId?.apartmentImages.length > 1 && (
                                <>
                                    <ScrollBtn className="scroller left" onClick={slideLeft} />
                                    <ScrollBtn className="scroller right" onClick={slideRight} />
                                </>
                            )}
                        </section>
                    )}
                    <div className="facilities">
                        <h3>Facilities</h3>
                        <ul>
                            {details.apartmentId?.facilities.map((facility, index) => {
                                return (
                                    <Fragment key={index}>
                                        <li>{facility}</li>
                                    </Fragment>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="apartment-info">
                        <h3>Apartment Information</h3>
                        <div>
                            <Info
                                head="Name"
                                paragraph={details.apartmentId?.apartmentName}
                            />
                            <Info
                                head="Country"
                                paragraph={details.apartmentId?.apartmentCountry}
                            />
                            <Info
                                head="State"
                                paragraph={details.apartmentId?.apartmentState}
                            />
                            <Info
                                head="Info"
                                paragraph={details.apartmentId?.apartmentInfo}
                            />
                            <Info head="Address" paragraph={details.apartmentId?.address} />
                            <Info
                                head="Type"
                                paragraph={details.apartmentId?.typeOfApartment}
                            />
                            <Info
                                head="Availability"
                                paragraph={
                                    details.apartmentId?.isAvailable === true
                                        ? "Available"
                                        : "Not Available"
                                }
                            />
                            <Info
                                head="Rooms"
                                paragraph={details.apartmentId?.numberOfBedrooms}
                            />
                            <Info
                                head="Gusets"
                                paragraph={details.apartmentId?.numberOfGuests}
                            />
                            <Info
                                head="Toilets"
                                paragraph={details.apartmentId?.numberOfToilets}
                            />
                            <Info head="Price" paragraph={details.apartmentId?.price} />
                            <Info head="Status" paragraph={details.apartmentId?.status} />
                        </div>
                    </div>
                    <div className="grow" style={{ margin: "2rem 0" }}>
                        <Info head="Booking Amount" paragraph={details.bookingAmount} />
                        <Info head="Booking Status" paragraph={details.bookingStatus} />
                        <Info head="Checkin Date" paragraph={details.checkInDate} />
                        <Info head="Checkout Date" paragraph={details.checkOutDate} />
                        <Info head="Created At" paragraph={details.createdAt} />
                        <Info
                            head="Booked"
                            paragraph={
                                details.isBooked === true ? "Already Booked" : "Not Booked"
                            }
                        />
                        <Info head="Payment Status" paragraph={details.paymentStatus} />
                    </div>
                </section>
            </section>
        </Fragment>
    );
};
export default BookingDetails;
