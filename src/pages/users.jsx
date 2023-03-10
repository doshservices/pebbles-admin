import { useEffect } from "react";
import { user } from "react-icons-kit/ikons/user";
import { Icon } from "react-icons-kit";
import { isAuthenticated } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import "../style/users.css";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();

  // const buisUrl = process.env.BUISNESS_HOST_URL;
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/users";

  const fetchData = async () => {
    await axios
      .get(buisUrl, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2U1MTRhNmJkZTVjODAwMWIyYjVlOTAiLCJpc1ZlcmlmaWVkIjpmYWxzZSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjc2OTAzMTgzLCJleHAiOjE2Nzk0OTUxODN9.TW-wrX6feCVXfdM24Ta6g87w3gcgqIx9s_UwyGw8qSQ`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

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
