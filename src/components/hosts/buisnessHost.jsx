import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CssLoader } from "../spinner/spinner";
import "./host.css";

const BuisnessHost = () => {
  const navigate = useNavigate();

  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );

  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  const [apiError, setApiError] = useState("");
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/admin/allbusiness";

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
        setDetails(res.data.data.businessHost[0]);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setApiError(err.message);
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
        <>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <td>{details.email}</td>
              <td>{details.phoneNumber}</td>
              <td>{details.role}</td>
              <td>{details.status}</td>
              {/* {details.map((detail, id) => {
                <tr key={id}>
                  <td>{detail.email}</td>
                </tr>;
              })} */}
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
            </tbody>
          </table>
        </>
      ) : (
        <p className="api-error">{apiError}</p>
      )}
    </div>
  );
};

export default BuisnessHost;
