import axios from "./base";

const usersStats = async () => {
  return await axios.get("/dashboard/stats/user");
};

const papersStats = async () => {
  return await axios.get("/dashboard/stats/paper");
};

export default {
  usersStats,
  papersStats,
};
