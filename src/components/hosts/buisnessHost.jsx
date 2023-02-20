import { useState, useEffect } from "react";
import { isAuthenticated } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuisnessHost = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  console.log(details);
  const buisUrl =
    "https://pubblessignature-production.up.railway.app/api/admin/allindividual";

  const fetchData = async () => {
    await axios
      .get(buisUrl, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2U1MTRhNmJkZTVjODAwMWIyYjVlOTAiLCJpc1ZlcmlmaWVkIjpmYWxzZSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjc2OTAzMTgzLCJleHAiOjE2Nzk0OTUxODN9.TW-wrX6feCVXfdM24Ta6g87w3gcgqIx9s_UwyGw8qSQ`,
        },
      })
      .then((res) => {
        console.log(res);
        setDetails(res);
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

  return <div>buisness</div>;
};

export default BuisnessHost;
