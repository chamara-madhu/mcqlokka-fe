import { useEffect, useState } from "react";
import PageHeader from "../../../shared/headers/PageHeader";
import { EXAMS, USER_ROLES } from "../../../../constants/base";
import dashboardService from "../../../../services/dashboard.service";

const DashboardMain = () => {
  const [userStats, setUserStats] = useState([]);
  const [paperStats, setPaperStats] = useState([]);
  const [preLoading, setPreLoading] = useState(true);

  const { usersStats, papersStats } = dashboardService();

  useEffect(() => {
    Promise.all([usersStats(), papersStats()])
      .then(([userStatsRes, papersStatsRes]) => {
        setUserStats(userStatsRes.data);
        setPaperStats(papersStatsRes.data);
        setPreLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
      <PageHeader title="Welcome to the Dashboard" />
      {preLoading ? (
        <preLoading />
      ) : (
        <div className="w-full" data-testid="all-new-applications-main">
          <p className="mt-4 mb-4 text-3xl font-semibold">Papers</p>
          <div className="container mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {paperStats?.map((paper, i) => (
                <div className="p-4 border rounded-lg bg-purple-50" key={i}>
                  <h2 className="mb-4 text-lg font-semibold">
                    {paper?._id?.exam === EXAMS.AL ? "A/L" : "O/L"}
                  </h2>
                  <p className={`text-6xl font-semibold text-purple-500`}>
                    {paper.count}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8 mb-4 text-3xl font-semibold">Users</p>
            <div className="grid grid-cols-4 gap-4">
              {userStats?.map((role, i) => (
                <div className="p-4 border rounded-lg bg-purple-50" key={i}>
                  <h2 className="mb-4 text-lg font-semibold">
                    {role?._id?.role === USER_ROLES.STUDENT
                      ? "Students"
                      : "Admins"}
                  </h2>
                  <p className={`text-6xl font-semibold text-purple-500`}>
                    {role.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMain;
