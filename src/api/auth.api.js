import axios from "./base";

const login = async (data) => {
  return await axios.post("/auth/login", data);
};

const register = async (data) => {
  return await axios.post("/auth/sign-up", data);
};

const verifyOtp = async (data) => {
  return await axios.post("/auth/verify", data);
};

export default {
  login,
  register,
  verifyOtp
};
