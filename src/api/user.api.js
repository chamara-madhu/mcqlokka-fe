import axios from "./base";

const getAllUsers = async () => {
  return await axios.get("/users");
};

export default {
  getAllUsers,
};
