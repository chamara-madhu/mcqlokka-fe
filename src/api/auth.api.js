import axios from "./base";

const login = async (data) => {
  return await axios.post("/auth/login", data);
};

const register = async (data) => {
  return await axios.post("/auth/sign-up", data);
};

const verify = async (token) => {
  return await axios.get(`/auth/verify/${token}`);
};

export default {
  login,
  register,
  verify
};
