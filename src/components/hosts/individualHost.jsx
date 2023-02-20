import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IndividualHost = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  console.log(details);
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
        setDetails(res.data.data.user);
      })
      .catch((err) => {
        console.log(err.response);
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
    <div>
      individualHost
      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>{details.email}</td>
            <td>{details.firstName}</td>
            <td>{details.lastName}</td>
            <td>{details.status}</td>
            <td>{details.isVerified}</td>
            <td>{details.googleSigned}</td>
            <td>{details.role}</td>
            <td>{details.phoneNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IndividualHost;
