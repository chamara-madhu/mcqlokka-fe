import axios from "./base";

const createSubject = async (data) => {
  return await axios.post("/subjects", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllSubjects = async (params = {}) => {
  return await axios.get("/subjects", { params });
};

const getSubjectById = async (id) => {
  return await axios.get(`/subjects/${id}`);
};

const updateSubject = async (id, data) => {
  return await axios.put(`/subjects/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteSubject = async (id) => {
  return await axios.delete(`/subjects/${id}`);
};

const updateApprovalStatus = async (id, status) => {
  return await axios.put(`/subjects/${id}/approval`, { isApproved: status });
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  updateApprovalStatus,
};
