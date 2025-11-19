import axios from "./base";

const getAllUsers = async () => {
  return await axios.get("/users");
};

const myData = async () => {
  return await axios.get("/users/my");
};

const updateMyProfile = async (data) => {
  return await axios.put('/users/update', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getAllUsers,
  myData,
  updateMyProfile
};
