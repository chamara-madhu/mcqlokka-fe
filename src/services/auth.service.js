import ApiIndex from "../api";

const authService = () => ({
  login: (data) => ApiIndex.AuthApi.login(data),
  signUp: (data) => ApiIndex.AuthApi.register(data),
  verify: (token) => ApiIndex.AuthApi.verify(token),
});

export default authService;
