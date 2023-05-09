import "./form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CssLoader } from "../../components/spinner/spinner";
import { useState, useRef, ChangeEvent } from "react";

const AddEvent = () => {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        eventName: "",
        description: '',
        eventCategory: '',
        eventLocation: '',
        eventCost: '',
        eventCountry: '',
        eventState: '',
        eventDate: '',
        eventTime: '',
        eventImages: ''
    };

    const [formValues, setFormValues] = useState(initialValues);
    console.log(formValues);
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );

    const api =
        "https://pubblessignature-production.up.railway.app/api/events/create-event";

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        axios
            .post(api, {
                eventName: formValues.eventName,
                description: formValues.description,
                eventCategory: formValues.eventCategory,
                eventLocation: formValues.eventLocation,
                eventCost: formValues.eventCost,
                eventCountry: formValues.eventCountry,
                eventState: formValues.eventState,
                eventDate: formValues.eventDate,
                eventTime: formValues.eventTime,
                eventImages: formValues.eventImages
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })
            .then((response) => {
                setLoading(false);
                console.log(response);
                // setFormValues()
                toast.success("Event Created Succesfully", {
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
            .catch((error) => {
                setLoading(false);
                setErr(error.message);
                console.log(error.response.data.message);
                toast.error(error.response.data.status, {
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
    };
    return (
        <section className="add-event">
            {loading && <CssLoader />}
            <form onSubmit={handleSubmit}>
                <input
                    name="eventName"
                    value={formValues.eventName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Event Name"
                    required
                />
                <input
                    value={formValues.eventCategory}
                    onChange={handleChange}
                    name="eventCategory"
                    type="text"
                    placeholder="Event Category"
                    required
                />
                <input
                    value={formValues.eventLocation}
                    onChange={handleChange}
                    name="eventLocation"
                    type="text"
                    placeholder="Event Location"
                    required
                />
                <input
                    value={formValues.eventCost}
                    onChange={handleChange}
                    name="eventCost"
                    type="text"
                    placeholder="Event Cost"
                    required
                />
                <input
                    value={formValues.eventCountry}
                    onChange={handleChange}
                    name="eventCountry"
                    type="text"
                    placeholder="Event Country"
                    required
                />
                <input
                    value={formValues.eventState}
                    onChange={handleChange}
                    name="eventState"
                    type="text"
                    placeholder="Event State"
                    required
                />
                <input
                    value={formValues.eventDate}
                    onChange={handleChange}
                    name="eventDate"
                    type="text"
                    placeholder="Event Date"
                    required
                />
                <input
                    value={formValues.eventTime}
                    onChange={handleChange}
                    name="eventTime"
                    type="text"
                    placeholder="Event Time"
                    required
                />
                <textarea
                    value={formValues.description}
                    onChange={handleChange}
                    name="description"
                    rows="5"
                    placeholder="Event Description"
                    required
                ></textarea>
                <input type="file"
                    name="eventImages"
                    value={formValues.eventImages}
                    onChange={handleChange}
                    multiple
                    required
                    accept="image/*"
                />
                <button type="submit">Create Event</button>
            </form>
        </section>
    );
};

export default AddEvent;
