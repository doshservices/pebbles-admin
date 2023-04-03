import { Search } from "../../components/search/search";
import dropdown from "./assets/dropdown.svg";
import options from "./assets/options.svg";
import expand from "./assets/expand.svg";
import { useNavigate } from "react-router-dom";
import "./users.css";
import { isAuthenticated } from "../../utils/helpers";
import { useEffect } from "react";

const Users = () => {

  const navigate = useNavigate()

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated]);

  return (
    <>
      <Search placeholder="Search here" />
      <section className="users">
        <div className="users-list-heading">
          <div>
            <h2>Users</h2>
            <p>List of all Users</p>
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
                <th>
                  <span>User ID</span>
                  <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Join Date</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>User Name</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Address</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Account Type</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Status</span> <img src={expand} alt="expand" />
                </th>
                <th>
                  <span>Options</span> <img src={expand} alt="expand" />
                </th>
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
                <td>
                  <img src={options} alt="options" />
                </td>
              </tr>
              <tr>
                <td>#0123450</td>
                <td>10 March 2023, 08:23 AM</td>
                <td>Shai Hulud Fred Great</td>
                <td>2 Shai Hulud Street, Shazam</td>
                <td>Host (Basic)</td>
                <td>Verified</td>
                <td>
                  <img src={options} alt="options" />
                </td>
              </tr>
              <tr>
                <td>#0123450</td>
                <td>10 March 2023, 08:23 AM</td>
                <td>Shai Hulud Fred Great</td>
                <td>2 Shai Hulud Street, Shazam</td>
                <td>Host (Basic)</td>
                <td>Verified</td>
                <td>
                  <img src={options} alt="options" />
                </td>
              </tr>
              <tr>
                <td>#0123450</td>
                <td>10 March 2023, 08:23 AM</td>
                <td>Shai Hulud Fred Great</td>
                <td>2 Shai Hulud Street, Shazam</td>
                <td>Host (Basic)</td>
                <td>Verified</td>
                <td>
                  <img src={options} alt="options" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default Users;
