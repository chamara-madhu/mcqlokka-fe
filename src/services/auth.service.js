import ApiIndex from "../api";

const authService = () => ({
  login: (data) => ApiIndex.AuthApi.login(data),
  signUp: (data) => ApiIndex.AuthApi.register(data),
  verifyOtp: (data) => ApiIndex.AuthApi.verifyOtp(data),
});

export default authService;
