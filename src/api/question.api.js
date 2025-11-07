import axios from "./base";

const getAllQuestions = async (query = "") => {
  return await axios.get(`/questions?${query}`);
};

const getQuestionById = async (id) => {
  return await axios.get(`/questions/${id}`);
};

const getAllQuestionsByPaperId = async (paperId) => {
  return await axios.get(`/questions/by-papers/${paperId}`);
};

const getAllQuestionsAndAnswersByPaperId = async (paperId) => {
  return await axios.get(`/questions/answers/by-papers/${paperId}`);
};

const createQuestion = async (data) => {
  return await axios.post("/questions", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateQuestion = async (id, data) => {
  return await axios.put(`/questions/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteQuestion = async (id) => {
  return await axios.delete(`/questions/${id}`);
};

const updateApprovalStatus = async (id, status) => {
  return await axios.put(`/questions/${id}/approval`, { isApproved: status });
};

const scanQuestion = async (formData) => {
  return await axios.post("/questions/scan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const generateModelPaper = async (data) => {
  return await axios.post("/questions/model/paper", data);
};

const lessonStatsByPaper = async (paperId) => {
  return await axios.get(`/questions/lesson/stats/${paperId}`);
};

export default {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  getQuestionById,
  getAllQuestionsByPaperId,
  getAllQuestionsAndAnswersByPaperId,
  deleteQuestion,
  updateApprovalStatus,
  scanQuestion,
  generateModelPaper,
  lessonStatsByPaper,
};
