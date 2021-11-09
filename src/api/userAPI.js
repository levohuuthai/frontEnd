import axiosClient from "./axiosClient";

const userAPI = {
    replaceUser(userID) {
    localStorage.setItem("user", JSON.stringify(userID.newUser));
    const url = "/users/" +userID.userID;
    return axiosClient.put(url, userID.newUser);
  }
};

export default userAPI;
