import ApiIndex from "../api";

const userService = () => ({
  getAllUsers: (query) => ApiIndex.UserApi.getAllUsers(query),
});

export default userService;
