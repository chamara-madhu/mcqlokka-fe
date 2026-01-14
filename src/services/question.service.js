import ApiIndex from "../api";

const questionService = () => ({
  getAllQuestions: (query) => ApiIndex.QuestionApi.getAllQuestions(query),
  createQuestion: (data) => ApiIndex.QuestionApi.createQuestion(data),
  getQuestionById: (id) => ApiIndex.QuestionApi.getQuestionById(id),
  updateQuestion: (id, data) => ApiIndex.QuestionApi.updateQuestion(id, data),
  getAllQuestionsByPaperId: (paperId) =>
    ApiIndex.QuestionApi.getAllQuestionsByPaperId(paperId),
  getAllQuestionsAndAnswersByPaperId: (paperId) =>
    ApiIndex.QuestionApi.getAllQuestionsAndAnswersByPaperId(paperId),
  deleteQuestion: (id) => ApiIndex.QuestionApi.deleteQuestion(id),
  removeAllByPaperId: (paperId) => ApiIndex.QuestionApi.removeAllByPaperId(paperId),
  updateApprovalStatus: (id, status) => ApiIndex.QuestionApi.updateApprovalStatus(id, status),
  scanQuestion: (formData) => ApiIndex.QuestionApi.scanQuestion(formData),
  generateModelPaper: (data) => ApiIndex.QuestionApi.generateModelPaper(data),
  lessonStatsByPaper: (paperId) => ApiIndex.QuestionApi.lessonStatsByPaper(paperId),
  getLessonsWiseQuestions: (subjectId) => ApiIndex.QuestionApi.getLessonsWiseQuestions(subjectId),
});

export default questionService;
