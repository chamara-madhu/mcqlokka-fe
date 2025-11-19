import ApiIndex from "../api";

const markService = () => ({
  getMarksByMarkId: (data) => ApiIndex.MarkApi.getMarksByMarkId(data),
  getHighestMarkStudentsByPaperId: (paperId) =>
    ApiIndex.MarkApi.getHighestMarkStudentsByPaperId(paperId),
  getAllMyResults: () => ApiIndex.MarkApi.getAllMyResults(),
  getAllMySubjects: () => ApiIndex.MarkApi.getAllMySubjects(),
});

export default markService;
