import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CssLoader } from "../spinner/spinner";
import "./host.css";

const IndividualHost = () => {
  const navigate = useNavigate();

  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  console.log(details);
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/admin/allindividual";

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
    <div>
      {loading && <CssLoader />}
      {details ? (
        <div className="host">
          <h3 className="host-heading">Individual Host</h3>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Firtsname</th>
                <th>Lastname</th>
                <th>Status</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{details.email}</td>
                <td>{details.firstName}</td>
                <td>{details.lastName}</td>
                <td>{details.status}</td>
                <td>{details.role}</td>
                <td>{details.phoneNumber}</td> */}
                <td
                  onClick={() => setShowOptions(!showOptions)}
                  className="actions"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </td>
                {showOptions && (
                  <td className="actions_options">
                    <p onClick={() => setShowOptions(!showOptions)}>Verify</p>
                    <p onClick={() => setShowOptions(!showOptions)}>Suspend</p>
                    <p onClick={() => setShowOptions(!showOptions)}>Delete</p>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Individual Host found</p>
      )}
    </div>
  );
};

export default IndividualHost;
