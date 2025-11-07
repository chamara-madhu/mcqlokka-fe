import ApiIndex from "../api";

const dashboardService = () => ({
  usersStats: () => ApiIndex.DashboardApi.usersStats(),
  papersStats: () => ApiIndex.DashboardApi.papersStats(),
});

export default dashboardService;
