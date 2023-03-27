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
      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Join Date</th>
              <th>User Name</th>
              <th>Address</th>
              <th>Account Type</th>
              <th>Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#0123450</td>
              <td>10 March 2023, 08:23 AM</td>
              <td>Shai Hulud Fred Great</td>
              <td>2 Shai Hulud Street, Shazam</td>
              <td>Host (Basic)</td>
              <td>Verified</td>
              <td>...</td>
            </tr>
            <tr>
              <td>#0123450</td>
              <td>10 March 2023, 08:23 AM</td>
              <td>Shai Hulud Fred Great</td>
              <td>2 Shai Hulud Street, Shazam</td>
              <td>Host (Basic)</td>
              <td>Verified</td>
              <td>...</td>
            </tr>
            <tr>
              <td>#0123450</td>
              <td>10 March 2023, 08:23 AM</td>
              <td>Shai Hulud Fred Great</td>
              <td>2 Shai Hulud Street, Shazam</td>
              <td>Host (Basic)</td>
              <td>Verified</td>
              <td>...</td>
            </tr>
            <tr>
              <td>#0123450</td>
              <td>10 March 2023, 08:23 AM</td>
              <td>Shai Hulud Fred Great</td>
              <td>2 Shai Hulud Street, Shazam</td>
              <td>Host (Basic)</td>
              <td>Verified</td>
              <td>...</td>
            </tr>
            <tr>
              <td>#0123450</td>
              <td>10 March 2023, 08:23 AM</td>
              <td>Shai Hulud Fred Great</td>
              <td>2 Shai Hulud Street, Shazam</td>
              <td>Host (Basic)</td>
              <td>Verified</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default BookingList;
