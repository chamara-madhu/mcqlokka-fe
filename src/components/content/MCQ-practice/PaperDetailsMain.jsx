import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
import { EXAMS, MEDIUMS } from "../../../constants/base";
import { Bar } from "react-chartjs-2";
import markService from "../../../services/mark.service";
import {
  ShoppingCart,
  CheckCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Award,
  FileText,
  Download,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PageLoader from "../../shared/loading/PageLoader";
import { addToCart } from "../../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import BackButton from "../../shared/buttons/BackButton";
import config from "../../../config/aws";
import HelmetComp from "../../shared/seo/HelmetComp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaperDetailsMain = () => {
  const [paper, setPaper] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [preLoading, setPreLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const { paperId } = useParams();

  const { getHighestMarkStudentsByPaperId } = markService();
  const { getPaperById, checkEligibility } = paperService();

  useEffect(() => {
    const fetchData = async () => {
      setPreLoading(true);
      const res = await getPaperById(paperId);
      setPaper(res.data);
      setPreLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkEligibility(paperId);
      setEligibility(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHighestMarkStudentsByPaperId(paperId);
      setHighestMarkStudents(res?.data || []);
    };
    if (paperId) {
      fetchData();
    }
  }, []);

  const handleAddToCart = (subject) => {
    setAddedToCart(true);
    dispatch(addToCart(subject));
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <HelmetComp
        title={`MCQ Lokka | ${paper?.subject?.forSearch} ${paper?.subject?.exam} ${paper?.year} Past Paper MCQs`}
        description={`Practice the ${paper?.year} ${paper?.subject?.forSearch} ${paper?.subject?.exam} past paper on MCQ Lokka. Access detailed MCQs, instant results, explanations, performance stats, and unlimited attempts.`}
        url={window.location.href}
      />

      <BackButton page="subject" />

      {/* Subject Info Section */}
      <div className="mb-5 bg-purple-50 p-7 rounded-t-2xl border-b-2 border-b-purple-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-2">
              {paper?.year}{" "}
              {paper?.subject?.medium === MEDIUMS.ENGLISH
                ? "paper"
                : "ප්‍රශ්න පත්‍රය"}
            </h1>
            <p className="text-purple-600 text-lg md:text-xl mb-3">
              {paper.subject.name}
            </p>
            {/* <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-200 rounded-lg text-purple-800 text-sm font-medium">
                {paper?.subject?.medium === MEDIUMS.ENGLISH
                  ? "English medium"
                  : "සිංහල මාධ්‍යය"}
              </span>
              <span className="px-3 py-1 bg-purple-200 rounded-lg text-purple-800 text-sm font-medium">
                {paper?.subject?.type} paper
              </span>
              <span className="px-3 py-1 bg-purple-200 rounded-lg text-purple-800 text-sm font-medium">
                {paper?.year}
              </span>
            </div> */}
          </div>

          {eligibility?.isNeedToBuy && (
            <button
              onClick={handleAddToCart}
              className={`flex items-center w-fit space-x-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      {/* <div className="bg-purple-50 p-5 border-t-2 border-t-purple-500"> */}
      <h2 className="text-2xl mt-8 mb-5 font-bold text-purple-900">Overview</h2>

      {/* Last Year Stats Section */}
      <div className="mb-10">
        {/* {lastYearData ? ( */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">
                Students
              </span>
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <p className="text-2xl font-bold text-purple-900">
              {paper?.stats?.noOfStuds?.toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">
                Pass Rate (A+B+C+S)
              </span>
              <TrendingUp className="w-5 h-5 text-blue-700" />
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {Math.round(
                ((paper?.stats?.a +
                  paper?.stats?.b +
                  paper?.stats?.c +
                  paper?.stats?.s) /
                  paper?.stats?.noOfStuds) *
                  100
              )}
              %
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">
                Fail Rate (F)
              </span>
              <TrendingDown className="w-5 h-5 text-red-700" />
            </div>
            <p className="text-2xl font-bold text-red-900">
              {Math.round((paper?.stats?.f / paper?.stats?.noOfStuds) * 100)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700 font-medium">
                <b>"A"</b> Grade Rate
              </span>
              <Award className="w-5 h-5 text-green-700" />
            </div>
            <p className="text-2xl font-bold text-green-900">
              {Math.round((paper?.stats?.a / paper?.stats?.noOfStuds) * 100)}%
            </p>
          </div>
        </div>
        {/* ) : (
          <p className="text-gray-500 italic">
            No data available for last year
          </p>
        )} */}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Sidebar */}
        <div className="flex flex-col w-full lg:w-[60%] gap-5 lg:gap-7">
          <h2 className="text-xl md:text-2xl font-bold text-purple-900">
            Paper Structure
          </h2>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-purple-600">
              Part I - MCQ
            </h3>

            {/* Part I - MCQ Section (Interactive on MCQ Lokka) */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-4">
                Multiple Choice Questions (MCQs)
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <p className="text-xs text-gray-600 font-medium">Medium</p>
                  <p className="text-lg font-bold text-purple-800">
                    {paper.subject.medium}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <p className="text-xs text-gray-600 font-medium">Duration</p>
                  <p className="text-lg font-bold text-purple-800">
                    {paper.time} hours
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <p className="text-xs text-gray-600 font-medium">Questions</p>
                  <p className="text-lg font-bold text-purple-800">
                    {paper.noOfQuestions}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/subjects/${paper.subject.exam.replace("/", "")}/${
                      paper.subject.forSearch
                    }/${paper.subject.medium}-medium/past-paper/${paper.year}/${
                      paper._id
                    }/mcq`.toLowerCase()
                  )
                }
                className="flex-1 w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold transition shadow-md"
              >
                Practice MCQs Now
              </button>

              <p className="text-sm text-gray-600 mt-4 text-center">
                ✓ Instant results ✓ Detailed explanations ✓ Unlimited attempts ✓
                Progress tracking
              </p>
            </div>
          </div>

          {/* Part II & Structured - Downloadable PDFs */}
          {paper.noOfQuestions === 30 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-purple-600">
                Part I - Structured
              </h3>

              <div className="flex text-sm justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                <div className=" text-gray-700">Paper</div>
                {!paper?.part1StructuredQuestion ? (
                  <span className="cursor-pointer items-center text-gray-400">
                    Coming Soon
                  </span>
                ) : (
                  <a
                    href={`${config.S3_PUBLIC_URL}/${paper.part1StructuredQuestion}`} // assume you have this field or adjust accordingly
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 text-purple-700 hover:text-purple-800 "
                  >
                    <Download size={18} /> Download PDF
                  </a>
                )}
              </div>

              <div className="flex text-sm justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                <div className=" text-gray-700">Marking Scheme</div>
                {!paper?.part1StructuredMarkingScheme ? (
                  <span className="cursor-pointer items-center text-gray-400">
                    Coming Soon
                  </span>
                ) : (
                  <a
                    href={paper.part1StructuredMarkingScheme}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 text-purple-700 hover:text-purple-800 "
                  >
                    <Download size={18} /> Download PDF
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold text-purple-600">Part II</h3>

            <div className="flex text-sm justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
              <div className=" text-gray-700">Paper</div>
              {!paper?.part2Question ? (
                <span className="cursor-pointer items-center text-gray-400">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={paper.part2Question}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2 text-purple-700 hover:text-purple-800 "
                >
                  <Download size={18} /> Download PDF
                </a>
              )}
            </div>

            <div className="flex text-sm justify-between items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
              <div className=" text-gray-700">Marking Scheme</div>
              {!paper?.part2MarkingScheme ? (
                <span className="cursor-pointer items-center text-gray-400">
                  Coming Soon
                </span>
              ) : (
                <a
                  href={paper.part2MarkingScheme}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-2 text-purple-700 hover:text-purple-800 "
                >
                  <Download size={18} /> Download PDF
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col w-full lg:w-[40%] gap-5 lg:gap-7">
          {/* Statistics Section */}
          {paper?.stats?.noOfStuds ? (
            <div className="flex flex-col w-full bg-white border border-purple-200 rounded-xl p-5 lg:p-8 shadow-md">
              <h2 className="text-lg lg:text-xl font-bold text-purple-900 mb-5">
                Student Performance Statistics
              </h2>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl lg:text-3xl font-bold text-purple-900">
                  {paper?.stats?.noOfStuds?.toLocaleString()}
                </span>
                <span className="text-sm lg:text-base text-gray-600">
                  students faced the exam.
                </span>
              </div>

              {/* Responsive Stats Layout */}
              <div className="flex flex-col gap-5 lg:gap-6">
                {/* Table */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="px-3 lg:px-4 py-2 text-left font-semibold">
                          Grade
                        </th>
                        <th className="px-3 lg:px-4 py-2 text-right font-semibold">
                          Students
                        </th>
                        <th className="px-3 lg:px-4 py-2 text-right font-semibold">
                          %
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {["A", "B", "C", "S", "F"].map((grade, idx) => (
                        <tr key={grade} className={idx % 2 ? "bg-gray-50" : ""}>
                          <td className="px-3 lg:px-4 py-2 font-medium">
                            {grade}
                          </td>
                          <td className="px-3 lg:px-4 py-2 text-right">
                            {paper?.stats[grade.toLowerCase()].toLocaleString()}
                          </td>
                          <td className="px-3 lg:px-4 py-2 text-right">
                            {(
                              (paper?.stats[grade.toLowerCase()] /
                                paper?.stats.noOfStuds) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Chart */}
                <div className="w-full h-[250px] lg:h-[260px]">
                  <Bar
                    data={{
                      labels: ["A", "B", "C", "S", "F"],
                      datasets: [
                        {
                          label: "Students",
                          data: ["A", "B", "C", "S", "F"].map(
                            (g) => paper.stats[g.toLowerCase()] ?? 0
                          ),
                          backgroundColor: [
                            "#4BC0C0",
                            "#36A2EB",
                            "#9966FF",
                            "#FFCE56",
                            "#FF6384",
                          ],
                          borderColor: "#fff",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      indexAxis: "y",
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => {
                              const val = ctx.parsed.x;
                              const pct = (
                                (val / paper.stats.noOfStuds) *
                                100
                              ).toFixed(2);
                              return `${
                                ctx.label
                              }: ${val.toLocaleString()} (${pct}%)`;
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          ticks: { beginAtZero: true },
                          title: {
                            display: true,
                            text: "Number of Students",
                          },
                        },
                        y: {
                          title: { display: true, text: "Grade" },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 lg:mt-10 text-xs lg:text-sm text-gray-500 text-center px-4">
                This summary reflects the actual performance distribution for{" "}
                <b>
                  G.C.E{" "}
                  {paper?.subject?.exam === EXAMS.AL
                    ? "Advanced Level"
                    : "Ordinary Level"}{" "}
                  - {paper?.year}.
                </b>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsMain;
