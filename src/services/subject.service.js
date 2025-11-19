import ApiIndex from "../api";

const subjectService = () => ({
  createSubject: (data) => ApiIndex.SubjectApi.createSubject(data),
  getAllSubjects: (query) => ApiIndex.SubjectApi.getAllSubjects(query),
  getSubjectById: (id) => ApiIndex.SubjectApi.getSubjectById(id),
  updateSubject: (id, data) => ApiIndex.SubjectApi.updateSubject(id, data),
  deleteSubject: (id) => ApiIndex.SubjectApi.deleteSubject(id),
  updateApprovalStatus: (id, status) => ApiIndex.SubjectApi.updateApprovalStatus(id, status),
  getAllPappersBySubject: (id) => ApiIndex.SubjectApi.getAllPappersBySubject(id),
  checkEligibility: (id) => ApiIndex.SubjectApi.checkEligibility(id),
});

export default subjectService;
