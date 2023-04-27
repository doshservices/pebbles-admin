import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const isAuthenticated = () => {

    const authToken = localStorage.getItem("Pebbles__Super_Admin___toKen");
    const ID = localStorage.getItem("Pebbles__Super_Admin___iD");

    if (authToken && ID !== "") {
        return true;
    }
    return false;
}

const Auth = () => {
    const navigate = useNavigate()

    const authenticated = isAuthenticated();

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }
    }, [authenticated]);
    return (
        <Fragment>

        </Fragment>
    )
}

export default Auth;
