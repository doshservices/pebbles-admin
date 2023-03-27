import "./bookinglist.css";
import dropdown from "./assets/dropdown.svg";

const BookingList = () => {
  return (
    <section className="booking-list">
      <div className="booking-list-heading">
        <div>
          <h2>Bookings List</h2>
          <p>This is your bookings list data</p>
        </div>
        <button>
          <span>Filter</span>
          <img src={dropdown} alt="dropdown" />
        </button>
      </div>
    </section>
  );
};

export default BookingList;
