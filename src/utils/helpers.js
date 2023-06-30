export const isAuthenticated = () => {

    const authToken = localStorage.getItem("pstk");
    const ID = localStorage.getItem("psid");
    const role = localStorage.getItem("psrole");

    if (authToken && ID !== "") {
        return true;
    }

    return false;
}

