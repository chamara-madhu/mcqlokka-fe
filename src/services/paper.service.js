import ApiIndex from "../api";

const paperService = () => ({
  createPaper: (data) => ApiIndex.PaperApi.createPaper(data),
  getAllPapers: (query) => ApiIndex.PaperApi.getAllPapers(query),
  getPaperById: (id) => ApiIndex.PaperApi.getPaperById(id),
  updatePaper: (id, data) => ApiIndex.PaperApi.updatePaper(id, data),
  deletePaper: (id) => ApiIndex.PaperApi.deletePaper(id),
  updateApprovalStatus: (id, status) => ApiIndex.PaperApi.updateApprovalStatus(id, status),
  markPaper: (id, answers, timeSpent, mode) => ApiIndex.PaperApi.markPaper(id, answers, timeSpent, mode),
  checkEligibility: (id) => ApiIndex.PaperApi.checkEligibility(id),
});

export default paperService;
