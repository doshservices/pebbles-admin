export const isAuthenticated = () => {

    const authToken = localStorage.getItem("pstk");
    const ID = localStorage.getItem("psid");

    if (authToken && ID !== "") {
        return true;
    }
    return false;
}

