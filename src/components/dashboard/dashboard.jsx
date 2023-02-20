import Users from "../../pages/users";
import "../../style/dashboard.css";
import BuisnessHost from "../hosts/buisnessHost";
import IndividualHost from "../hosts/individualHost";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <Users />
      <BuisnessHost />
      <IndividualHost />
    </section>
  );
};
export default Dashboard;
