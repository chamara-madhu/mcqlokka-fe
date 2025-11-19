import { Fragment, useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
import { EXAMS } from "../../../constants/base";
import PaperCard from "../../shared/cards/PaperCard";
import subjectService from "../../../services/subject.service";
import { useParams } from "react-router-dom";
import { ShoppingCart, CheckCircle, Unlock } from "feather-icons-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import PageLoader from "../../shared/loading/PageLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AllPapersBySubjectMain() {
  const [subject, setSubject] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [papers, setPapers] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(true);
  const [preLoading, setPreLoading] = useState(true);
  const { getAllPapers } = paperService();
  const { getSubjectById, checkEligibility } = subjectService();
  const { subjectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubject = async () => {
      setPreLoading(true);
      const res = await getSubjectById(subjectId);
      setSubject(res?.data);

      const res2 = await checkEligibility(res?.data?._id);
      setHasPurchased(res2?.data?.hasPurchased);
      setPreLoading(false);
    };

    fetchSubject();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllPapers({ subject: subjectId, isApproved: "Yes" });
      setPapers(res?.data || []);
    };

    fetch();
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(subject));
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const allStats = papers?.map((paper) => ({
    ...paper.stats,
    year: paper.year,
  }));

  const grades = ["A", "B", "C", "S", "F"];
  const years = allStats.map((s) => s.year);

  // Bar data (counts)
  const barDatasets = grades.map((grade, i) => ({
    label: grade,
    data: allStats.map((s) => s[grade.toLowerCase()] ?? 0),
    backgroundColor: [
      "rgba(74, 222, 128, 0.8)", // A – green
      "rgba(59, 130, 246, 0.8)", // B – blue
      "rgba(139, 92, 246, 0.8)", // C – violet
      "rgba(251, 191, 36, 0.8)", // S – amber
      "rgba(239, 68, 68, 0.8)", // F – red
    ][i],
  }));

  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Subject Info Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-900 mb-3">
                {subject?.name}
              </h1>
              <p className="text-purple-600 text-lg sm:text-xl mb-4">
                G.C.E -{" "}
                {subject?.exam === EXAMS.AL
                  ? "Advanced Level"
                  : "Ordinary Level"}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-purple-200 backdrop-blur-md rounded-lg text-black text-sm font-medium">
                  {subject?.medium} medium
                </span>
                <span className="px-4 py-2 bg-purple-200 backdrop-blur-md rounded-lg text-black text-sm font-medium">
                  {subject?.type} papers
                </span>
                <span className="px-4 py-2 bg-purple-200 backdrop-blur-md rounded-lg text-black text-sm font-medium">
                  9 Years (2017-2025)
                </span>
              </div>
            </div>
            {!hasPurchased && (
              <button
                onClick={handleAddToCart}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Free Sample Banner */}
        {!hasPurchased && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Unlock className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Try Before You Buy! 🎉
                </h3>
                <p className="text-gray-700">
                  Try the{" "}
                  <span className="font-semibold text-green-600">
                    2017 past paper for free
                  </span>{" "}
                  to experience the quality of our content. Purchase the full
                  package to unlock all papers from 2018-2025.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Papers Grid */}
        <div className="grid w-full grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {papers?.length > 0 &&
            papers?.map((paper, index) => (
              <PaperCard key={index} {...paper} hasPurchased={hasPurchased} />
            ))}
        </div>

        {allStats?.length > 0 ? (
          <div className="mt-10">
            <h1 className="text-2xl mb-1 text-purple-800 font-medium">
              Student Performance Statistics
            </h1>
            <p className="mb-5 text-gray-500">
              This summary reflects the actual performance distribution.
            </p>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full min-w-max table-auto">
                <thead className="bg-purple-100 text-purple-900">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Year</th>
                    <th className="px-4 py-2 text-right font-semibold">
                      No of Students
                    </th>
                    {["A", "B", "C", "S", "F"].map((grade) => (
                      <Fragment key={grade}>
                        <th className="px-4 py-2 text-right font-semibold">
                          {grade}
                        </th>
                        <th className="px-4 py-2 text-right font-semibold">
                          %
                        </th>
                      </Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {allStats.map((stat, index) => {
                    const totalStudents = stat.noOfStuds || 0;
                    return (
                      <tr
                        key={stat.year || index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-4 py-2 font-medium">{stat.year}</td>
                        <td className="px-4 py-2 text-right font-medium">
                          {totalStudents.toLocaleString()}
                        </td>
                        {["a", "b", "c", "s", "f"].map((gradeKey) => {
                          const count = stat[gradeKey] || 0;
                          const percentage =
                            totalStudents > 0
                              ? ((count / totalStudents) * 100).toFixed(2)
                              : "0.00";
                          return (
                            <Fragment key={gradeKey}>
                              <td className="px-4 py-2 text-right">
                                {count.toLocaleString()}
                              </td>
                              <td className="px-4 py-2 text-right text-sm text-gray-600">
                                {percentage}%
                              </td>
                            </Fragment>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {allStats?.length > 0 && (
          <div className="mt-10 space-y-10">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-purple-700">
                Grade Distribution by Year (Counts)
              </h3>
              <div className="h-80">
                <Bar
                  data={{
                    labels: years,
                    datasets: barDatasets,
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${
                              ctx.dataset.label
                            }: ${ctx.parsed.y.toLocaleString()}`,
                        },
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: "Year" } },
                      y: {
                        title: { display: true, text: "No. of Students" },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* ----- Line Chart (Percentage Trend) ----- */}
            {/* <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="mb-4 text-lg font-semibold text-purple-700">
                Grade Percentage Trend Over Years
              </h3>
              <div className="h-80">
                <Line
                  data={{
                    labels: years,
                    datasets: lineDatasets,
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${ctx.dataset.label}: ${ctx.parsed.y}%`,
                        },
                      },
                    },
                    scales: {
                      x: { title: { display: true, text: "Year" } },
                      y: {
                        title: { display: true, text: "Percentage (%)" },
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
            </div> */}
          </div>
        )}

        {/* Bottom CTA */}
        {!hasPurchased && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Get Complete Access to All Papers
            </h3>
            <p className="text-purple-100 mb-6 text-lg max-w-2xl mx-auto">
              Unlock all past papers from 2018 to 2025 with detailed solutions
              and explanations
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-lg inline-flex items-center space-x-2"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add Complete Package</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPapersBySubjectMain;
