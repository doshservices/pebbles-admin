import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./host.css";

const BuisnessHost = () => {
  const navigate = useNavigate();
  const authToken = JSON.parse(
    localStorage.getItem("Pebbles__Super_Admin___toKen")
  );

  const [details, setDetails] = useState("");
  console.log(details);
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/admin/allbusiness";

  const fetchData = async () => {
    await axios
      .get(buisUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setDetails(res.data.data.buisnessHost);
      })
      .catch((err) => {
        console.log(err);
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
      {details ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
                {/* <th>Email</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div>No Buisness host Found</div>
      )}
    </div>
  );
};

export default BuisnessHost;
