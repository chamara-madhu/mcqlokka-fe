import axios from "./base";

const login = async (data) => {
  return await axios.post("/auth/login", data);
};

const register = async (data) => {
  return await axios.post("/auth/sign-up", data);
};

export default {
  login,
  register,
};
