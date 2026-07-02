import axios from "./base";

const create = async (questionId, data) => {
  return await axios.post(`/lessons-wise-questions/practice/${questionId}`, data);
};

export default {
  create
};
