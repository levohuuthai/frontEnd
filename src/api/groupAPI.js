import axiosClient from "./axiosClient";

const groupAPI = {
  getRoomByUserId(userId) {
    const url = "/rooms/getRoomByUserId/" + userId.userId;
    return axiosClient.get(url, userId);
  },
  addGroup(NameGroup) {
    const url = "/rooms/addRoom/";
    return axiosClient.post(url, {
      NameGroup: NameGroup.NameGroup,
      ListUsers: NameGroup.ListUsers,
    });
  },
  addMember(data) {
    const url = "/rooms/addMembers/";
    return axiosClient.post(url, { id:data.id._id, list_user_id:data.list_user_id});
  },
};

export default groupAPI;
