export const isAuthenticated = () => {

    const authToken = localStorage.getItem("Pebbles__Super_Admin___toKen");
    const ID = localStorage.getItem("Pebbles__Super_Admin___iD");

    if (authToken && ID !== "") {
        return true;
    }
    return false;
}
