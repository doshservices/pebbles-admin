export const isAuthenticated = () => {

    const authToken = localStorage.getItem("Pebbles__Super_Admin___iD");
    const ID = localStorage.getItem("Pebbles__Super_Admin___toKen");

    if (authToken && ID !== "") {
        return true;
    }
    return false;
}

// export const isAuthorized = () => {
// const bearer = localStorage.getItem()
// }