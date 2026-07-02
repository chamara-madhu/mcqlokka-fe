import ApiIndex from "../api";

const lessonWiseQuestionService = () => ({
  create: (questionId, data) => ApiIndex.LessonWiseQuestionApi.create(questionId, data),
});

export default lessonWiseQuestionService;
