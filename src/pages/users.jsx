import { useEffect } from "react";
import "../style/users.css";
import { useNavigate } from "react-router-dom";
import { user } from "react-icons-kit/ikons/user";
import { Icon } from "react-icons-kit";
import { isAuthenticated } from "../utils/helpers";

const Users = () => {
  const navigate = useNavigate();

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate("/sign-in");
    }
  }, [authenticated]);
  return (
    <section className="users">
      <div className="total_host">
        <div>
          <h3>21,457</h3>
          <h2>Total Hosts</h2>
        </div>
        <Icon icon={user} size={16} />
      </div>
      <div className="total-users">
        <div>
          <h3>21,457</h3>
          <h2>Total Users</h2>
        </div>
        <Icon icon={user} size={16} />
      </div>
      <div className="total-bookings">
        <div>
          <h3>21,457</h3>
          <h2>Total Bookings</h2>
        </div>
        <Icon icon={user} size={16} />
      </div>
    </section>
  );
};

export default Users;
