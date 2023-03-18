import "../../style/overview.css";

const Overview = () => {
  return (
    <section className="overview">
      <h2>All Time</h2>
      <section className="total_amount">
        <div>
          <p>10</p>
          <p>Apartment Booked</p>
        </div>
        <div>
          <p>10</p>
          <p>Sheduled Booking</p>
        </div>
        <div>
          <p>10</p>
          <p>Check-ins</p>
        </div>
        <div>
          <p>10</p>
          <p>Check-out</p>
        </div>
      </section>
    </section>
  );
};
export default Overview;
