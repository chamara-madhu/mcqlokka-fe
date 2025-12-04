import ApiIndex from "../api";

const lessonService = () => ({
  getAllLessons: (query) => ApiIndex.LessonApi.getAllLessons(query),
  getLessonById: (id) => ApiIndex.LessonApi.getLessonById(id),
  createLesson: (data) => ApiIndex.LessonApi.createLesson(data),
  createBulkLesson: (data) => ApiIndex.LessonApi.createBulkLesson(data),
  updateLesson: (id, data) => ApiIndex.LessonApi.updateLesson(id, data),
  getAllLessonsByPaperId: (data) =>
    ApiIndex.LessonApi.getAllLessonsByPaperId(data),
  getAllLessonsBySubjectId: (data) =>
    ApiIndex.LessonApi.getAllLessonsBySubjectId(data),
  deleteLesson: (id) => ApiIndex.LessonApi.deleteLesson(id),
});

export default lessonService;
