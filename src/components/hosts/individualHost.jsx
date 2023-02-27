import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../spinner/spinner";
import "./host.css";

const IndividualHost = () => {
  const navigate = useNavigate();

  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  console.log(details);
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/users";

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(buisUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setDetails(res.data.data.user);
      })
      .catch((err) => {
        setLoading(false);
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
    <>
      {loading && <Spinner />}
      {details ? (
        <div>
          individualHost
          <table>
            <tbody>
              <tr>
                <td>Email</td>
                <td>Firtsname</td>
                <td>Lastname</td>
                <td>Status</td>
                <td>Role</td>
                <td>Phone Number</td>
              </tr>
              <tr>
                <td>{details.email}</td>
                <td>{details.firstName}</td>
                <td>{details.lastName}</td>
                <td>{details.status}</td>
                <td>{details.role}</td>
                <td>{details.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Host found</p>
      )}
    </>
  );
};

export default IndividualHost;
