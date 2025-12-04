import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";
import StudentRankCard from "../../shared/cards/StudentRankCard";
import { useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
import { EXAMS, FEES } from "../../../constants/base";
import { Bar } from "react-chartjs-2";
import markService from "../../../services/mark.service";
import {
  ShoppingCart,
  CheckCircle,
  X,
  AlertCircle,
  Clock,
  BookOpen,
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MCQStartMain = () => {
  const [paper, setPaper] = useState([]);
  const [highestMarkStudents, setHighestMarkStudents] = useState([]);
  const [eligibility, setEligibility] = useState(null);
  const [preLoading, setPreLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const dispatch = useDispatch();

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

  const openModeModal = (mode) => {
    setSelectedMode(mode);
    setShowModeModal(true);
  };

  const closeModeModal = () => {
    setShowModeModal(false);
    setSelectedMode(null);
  };

  // Content translations
  const content = {
    English: {
      mode: "Practice Mode",
      examMode: "Exam Mode",
      learningMode: "Learning Mode",
      instructions: "Instructions",
      startExam: "Start Exam",
      startLearning: "Start Learning",
      cancel: "Cancel",
      examDesc: "Simulate real exam conditions with timed assessment",
      learningDesc: "Practice with instant feedback and explanations",
      examInstructions: [
        "This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.",
        "Once you submit an answer, you cannot go back to change it.",
        "The exam will automatically submit when the time runs out.",
        "Your answers will be saved automatically as you progress.",
        "Make sure you have a stable internet connection throughout the exam.",
      ],
      learningInstructions: [
        "This mode allows you to practice at your own pace without time pressure.",
        "You will receive instant feedback for each answer you submit.",
        "You can review and change your answers anytime before final submission.",
        "Detailed explanations are provided for each question to help you learn.",
        "Take your time to understand the concepts thoroughly.",
      ],
      importantNote: "Important",
      examNote:
        "Please ensure you have a stable internet connection and are in a quiet environment before starting.",
      learningNote:
        "Use this mode to understand concepts thoroughly. Take breaks whenever needed.",
    },
    Sinhala: {
      mode: "පුහුණු ආකාරය",
      examMode: "විභාග ආකාරය",
      learningMode: "ඉගෙනුම් ආකාරය",
      instructions: "උපදෙස්",
      startExam: "විභාගය ආරම්භ කරන්න",
      startLearning: "ඉගෙනීම ආරම්භ කරන්න",
      cancel: "අවලංගු කරන්න",
      examDesc:
        "කාල සීමාව සහිත තක්සේරුව සමඟ සැබෑ විභාග තත්ත්වයන් අනුකරණය කරන්න",
      learningDesc: "ක්ෂණික ප්‍රතිචාර සහ පැහැදිලි කිරීම් සමඟ පුහුණු වන්න",
      examInstructions: [
        "මෙය කාල සීමාවක් ඇති පරීක්ෂණයකි. ආරම්භ කළ පසු කාල ගණකය නැවැත්විය නොහැකි බැවින්, පරීක්ෂණය අතරතුර බාධා නොවන බව සහතික කර ගන්න.",
        "ඔබ පිළිතුරක් ඉදිරිපත් කළ පසු, එය වෙනස් කිරීමට ආපසු යා නොහැක.",
        "කාලය අවසන් වූ විට විභාගය ස්වයංක්‍රීයව ඉදිරිපත් වේ.",
        "ඔබ ඉදිරියට යන විට ඔබගේ පිළිතුරු ස්වයංක්‍රීයව සුරකිනු ලැබේ.",
        "විභාගය පුරාවටම ස්ථාවර අන්තර්ජාල සම්බන්ධතාවයක් ඇති බවට වග බලා ගන්න.",
      ],
      learningInstructions: [
        "මෙම ආකාරය ඔබට කාල පීඩනයකින් තොරව ඔබේම වේගයෙන් පුහුණු වීමට ඉඩ සලසයි.",
        "ඔබ ඉදිරිපත් කරන සෑම පිළිතුරක් සඳහාම ඔබට ක්ෂණික ප්‍රතිචාර ලැබෙනු ඇත.",
        "අවසන් ඉදිරිපත් කිරීමට පෙර ඕනෑම වේලාවක ඔබගේ පිළිතුරු සමාලෝචනය කර වෙනස් කළ හැකිය.",
        "ඔබට ඉගෙන ගැනීමට උපකාර කිරීම සඳහා සෑම ප්‍රශ්නයක් සඳහාම විස්තරාත්මක පැහැදිලි කිරීම් සපයනු ලැබේ.",
        "සංකල්ප හොඳින් අවබෝධ කර ගැනීමට ඔබේ කාලය ගන්න.",
      ],
      importantNote: "වැදගත්",
      examNote:
        "ආරම්භ කිරීමට පෙර ඔබට ස්ථාවර අන්තර්ජාල සම්බන්ධතාවයක් ඇති බවත් නිහඬ පරිසරයක සිටින බවත් සහතික කර ගන්න.",
      learningNote:
        "සංකල්ප හොඳින් අවබෝධ කර ගැනීමට මෙම ආකාරය භාවිතා කරන්න. අවශ්‍ය විටෙක විවේකයක් ගන්න.",
    },
  };

  const t = content[paper?.subject?.medium] || content.English;

  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-[40%] gap-7 h-fit">
        <div className="flex flex-col w-full gap-10 p-5 rounded-lg bg-purple-50 h-fit">
          {user?.name ? <p>Hey {user.name}👋</p> : null}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Welcome to</h1>
            <h1 className="text-3xl font-semibold">
              G.C.E{" "}
              {paper?.subject?.exam === EXAMS.AL
                ? "Advanced Level"
                : "Ordinary Level"}{" "}
              - {paper?.subject?.name} - {paper?.year}
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Medium</p>
            <p>{paper?.subject?.medium}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Time duration</p>
            <p>{paper?.time} hours</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">No. of questions</p>
            <p>{paper?.noOfQuestions} questions</p>
          </div>
        </div>
        {highestMarkStudents?.length > 0 && (
          <div className="flex flex-col w-full p-5 rounded-lg bg-purple-50 h-fit">
            <h2 className="mb-4 text-lg font-semibold text-purple-700">
              Leaderboard
            </h2>
            <div className="flex flex-col gap-3">
              {highestMarkStudents.map((student, i) => (
                <StudentRankCard key={student?._id} no={i + 1} {...student} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-[60%] gap-7">
        {/* Mode Selection Cards */}
        {(!user?.name && paper?.fee === FEES.FREE) ||
        (paper?.fee === FEES.FREE && eligibility?.attemptsRemaining > 0) ||
        (paper?.fee === FEES.PAID && eligibility?.attemptsRemaining > 0) ? (
          <>
            <h1 className="text-2xl font-semibold">{t.mode}</h1>
            <div className="grid grid-cols-2 gap-5">
              {/* Exam Mode Card */}
              <button
                onClick={() => openModeModal("exam")}
                className="flex items-start bg-white border-2 border-purple-200 hover:border-purple-500 rounded-lg p-6 text-left transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t.examMode}
                    </h3>
                    <p className="text-sm text-gray-600">{t.examDesc}</p>
                  </div>
                </div>
              </button>

              {/* Learning Mode Card */}
              <button
                onClick={() => openModeModal("learning")}
                className="flex items-start bg-white border-2 border-purple-200 hover:border-purple-500 rounded-lg p-6 text-left transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {t.learningMode}
                    </h3>
                    <p className="text-sm text-gray-600">{t.learningDesc}</p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : null}

        {!user?.name && paper?.fee === FEES.PAID && (
          <div>
            <h1 className="text-2xl mb-4 font-semibold">Buy now</h1>
            <button
              onClick={() => handleAddToCart(paper?.subject)}
              className={`flex w-fit items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        )}

        {paper?.fee === FEES.PAID && eligibility?.isNeedToBuy && (
          <div>
            <h1 className="text-2xl mb-4 font-semibold">Buy now</h1>
            <button
              onClick={() => handleAddToCart(paper?.subject)}
              className={`flex w-fit items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {addedToCart ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        )}

        {eligibility?.attemptsRemaining != null && (
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-purple-600" />
            <p className="text-sm font-medium text-purple-700">
              {eligibility.attemptsRemaining > 0
                ? `${eligibility?.attemptsRemaining} attempt(s) remaining`
                : "All attempts have been used."}
            </p>
          </div>
        )}

        <hr />

        {paper?.stats?.noOfStuds ? (
          <div className="flex flex-col w-full bg-white border border-purple-200 rounded-xl p-8">
            <h2 className="text-lg mb-5 font-semibold text-purple-700">
              Student Performance Statistics
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-purple-900">
                {paper?.stats?.noOfStuds?.toLocaleString()}
              </span>
              <span className="text-md text-gray-600">
                students faced the exam.
              </span>
            </div>
            <div className="flex gap-4">
              <div className="w-[40%]">
                <table className="w-full border border-gray-300 rounded overflow-hidden text-sm">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="px-4 py-2 text-left">Grade</th>
                      <th className="px-4 py-2 text-right">No. of Students</th>
                      <th className="px-4 py-2 text-right">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["A", "B", "C", "S", "F"].map((grade, idx) => (
                      <tr key={grade} className={idx % 2 ? "bg-gray-50" : ""}>
                        <td className="px-4 py-2">{grade}</td>
                        <td className="px-4 py-2 text-right">
                          {paper?.stats[grade.toLowerCase()].toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-right">
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
              <div className="flex w-[60%]">
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
                        title: { display: true, text: "Number of Students" },
                      },
                      y: {
                        title: { display: true, text: "Grade" },
                      },
                    },
                  }}
                  height={260}
                />
              </div>
            </div>
            <div className="mt-10 text-sm text-gray-500 text-center">
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

      {/* Clean Professional Modal */}
      {showModeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {selectedMode === "exam" ? (
                  <div className="p-2 bg-purple-100 rounded">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-purple-100 rounded">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedMode === "exam" ? t.examMode : t.learningMode}
                </h3>
              </div>
              <button
                onClick={closeModeModal}
                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-180px)]">
              <h4 className="text-base font-semibold text-gray-900 mb-3">
                {t.instructions}
              </h4>
              <ol className="space-y-3 mb-5">
                {(selectedMode === "exam"
                  ? t.examInstructions
                  : t.learningInstructions
                ).map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 font-semibold text-purple-600">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">
                      {t.importantNote}
                    </h5>
                    <p className="text-sm text-gray-700">
                      {selectedMode === "exam" ? t.examNote : t.learningNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={closeModeModal}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {t.cancel}
              </button>
              <Link to={`${MCQ_ALL_PATH}/${selectedMode}/${paper?._id}`}>
                <button className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  {selectedMode === "exam" ? t.startExam : t.startLearning}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCQStartMain;
