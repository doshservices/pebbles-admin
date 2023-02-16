
const saveToStorage = () => {

}

export const isAuthenticated = () => {

    const authToken = localStorage.getItem("id");
    const ID = localStorage.getItem("token");

    if (authToken && ID !== "") {
        return true;
    }
    return false;
}