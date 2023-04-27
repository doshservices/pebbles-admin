import { useEffect, useState } from "react";
import axios from "axios";

const TotalUsers = () => {
    const [details, setDetails] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const usersLength = details.length;

    const users = 'https://pubblessignature-production.up.railway.app/api/users/all';
    const authToken = JSON.parse(
        localStorage.getItem("Pebbles__Super_Admin___toKen")
    );
    const fetchData = async () => {
        setIsLoading(true)
        await axios
            .get(users, {
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
            {usersLength > 0 ? <p>{usersLength}</p> : <p>{apiError}</p>}
            <p>Total Users</p>
        </div>
    )
}
export default TotalUsers;