import axios from "axios";
import { useEffect, useState } from "react";

const TotalUsers = () => {
    const [details, setDetails] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const usersLength = details.length;

    const users = process.env.REACT_APP_URL;
    const authToken = JSON.parse(
        localStorage.getItem("pstk")
    );
    const fetchData = async () => {
        setIsLoading(true)
        await axios
            .get(`${users}/api/users/all`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((res) => {
                setIsLoading(false)
                // console.log(res);
                setDetails(res.data.data.users);
            })
            .catch((err) => {
                setIsLoading(false)
                // console.log(err);
                setApiError(err.message);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {usersLength > 0 ? <p>{usersLength}</p> : <p style={{ fontSize: '1.1rem' }}>{apiError}</p>}
            <p>Total Users</p>
        </div>
    )
}
export default TotalUsers;