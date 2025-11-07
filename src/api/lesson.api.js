import axios from "./base";

const getAllLessons = async (query = "") => {
  return await axios.get(`/lessons?${query}`);
};

const getLessonById = async (id) => {
  return await axios.get(`/lessons/${id}`);
};

const getAllLessonsByPaperId = async (paperId) => {
  return await axios.get(`/lessons/by-paper/${paperId}`);
};

const createLesson = async (data) => {
  return await axios.post("/lessons", data);
};

const updateLesson = async (id, data) => {
  return await axios.put(`/lessons/${id}`, data);
};

const deleteLesson = async (id) => {
  return await axios.delete(`/lessons/${id}`);
};

export default {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  getAllLessonsByPaperId,
  deleteLesson,
};
