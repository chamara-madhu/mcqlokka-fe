import axios from "./base";

const getMarksByMarkId = async (markId) => {
  return await axios.get(`/marks/${markId}`);
};

const getHighestMarkStudentsByPaperId = async (paperId) => {
  return await axios.get(`/marks/highest/${paperId}`);
};

const getAllMyResults = async () => {
  return await axios.get("/marks/my/results");
};

const getAllMySubjects = async () => {
  return await axios.get("/marks/my/subjects");
};

export default {
  getMarksByMarkId,
  getHighestMarkStudentsByPaperId,
  getAllMyResults,
  getAllMySubjects
};
