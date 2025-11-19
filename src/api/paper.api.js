import axios from "./base";

const createPaper = async (data) => {
  return await axios.post("/papers", data);
};

const getAllPapers = async (params = {}) => {
  return await axios.get("/papers", { params });
};

const getPaperById = async (id) => {
  return await axios.get(`/papers/${id}`);
};

const updatePaper = async (id, data) => {
  return await axios.put(`/papers/${id}`, data);
};

const deletePaper = async (id) => {
  return await axios.delete(`/papers/${id}`);
};

const updateApprovalStatus = async (id, status) => {
  return await axios.put(`/papers/${id}/approval`, { isApproved: status });
};

const markPaper = async (id, answers, timeSpent, mode) => {
  return await axios.post(`/papers/marks/${id}`, { answers, timeSpent, mode });
};

const checkEligibility = async (id) => {
  return await axios.get(`/papers/eligibility/${id}`);
};

export default {
  createPaper,
  getAllPapers,
  getPaperById,
  updatePaper,
  deletePaper,
  updateApprovalStatus,
  markPaper,
  checkEligibility,
};
