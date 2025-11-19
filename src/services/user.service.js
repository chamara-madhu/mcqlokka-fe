import ApiIndex from "../api";

const userService = () => ({
  getAllUsers: (query) => ApiIndex.UserApi.getAllUsers(query),
  myData: () => ApiIndex.UserApi.myData(),
  updateMyProfile: (data) => ApiIndex.UserApi.updateMyProfile(data),
});

export default userService;
