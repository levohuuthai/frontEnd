import axiosClient from "./axiosClient";

const messageAPI = {
  GetMessage(message) {
    const url = "/messages/" + message.idRoom;
    return axiosClient.get(url);
  },
  AddMessage(message) {
    const url = "/messages/addMessage";
    return axiosClient.post(url, message.message);
  }
};

export default messageAPI;