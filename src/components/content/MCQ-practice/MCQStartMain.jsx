import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
  Trophy,
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
        "You can review and change your answers anytime before final submission.",
        "The exam will automatically submit when the time runs out.",
        "Make sure you have a stable internet connection throughout the exam.",
      ],
      learningInstructions: [
        "This mode allows you to practice at your own pace without time pressure.",
        "You will receive instant feedback for each answer you submit.",
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
        "අවසන් ඉදිරිපත් කිරීමට පෙර ඕනෑම වේලාවක ඔබගේ පිළිතුරු සමාලෝචනය කර වෙනස් කළ හැකිය.",
        "කාලය අවසන් වූ විට විභාගය ස්වයංක්‍රීයව ඉදිරිපත් වේ.",
        "විභාගය පුරාවටම ස්ථාවර අන්තර්ජාල සම්බන්ධතාවයක් ඇති බවට වග බලා ගන්න.",
      ],
      learningInstructions: [
        "මෙම ආකාරය ඔබට කාල පීඩනයකින් තොරව ඔබේම වේගයෙන් පුහුණු වීමට ඉඩ සලසයි.",
        "ඔබ ඉදිරිපත් කරන සෑම පිළිතුරක් සඳහාම ඔබට ක්ෂණික ප්‍රතිචාර ලැබෙනු ඇත.",
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
    <div className="px-4 sm:px-6 lg:px-8">
      <BackButton page="paper" />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left Sidebar */}
        <div className="flex flex-col w-full lg:w-[40%] gap-5 lg:gap-7">
          {/* Welcome Card */}
          <div className="flex flex-col w-full gap-6 lg:gap-10 p-5 lg:p-6 rounded-xl bg-purple-50 shadow-sm">
            {user?.name && (
              <p className="text-base lg:text-lg font-medium text-purple-900">
                Hey {user.name} 👋
              </p>
            )}

            <div className="flex flex-col gap-3 lg:gap-4">
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-tight">
                Welcome to
              </h1>
              <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-purple-900 leading-tight">
                G.C.E{" "}
                {paper?.subject?.exam === EXAMS.AL
                  ? "Advanced Level"
                  : "Ordinary Level"}
              </h2>
              <p className="text-lg lg:text-xl font-semibold text-gray-800">
                {paper?.subject?.name} - {paper?.year}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 font-medium">Medium</p>
                <p className="text-sm font-semibold text-gray-900">
                  {paper?.subject?.medium}
                </p>
              </div>

              <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 font-medium">Duration</p>
                <p className="text-sm font-semibold text-gray-900">
                  {paper?.time} hours
                </p>
              </div>

              <div className="flex flex-col p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-600 font-medium">Questions</p>
                <p className="text-sm font-semibold text-gray-900">
                  {paper?.noOfQuestions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col w-full lg:w-[60%] gap-5 lg:gap-7">
          {/* Mode Selection Cards */}
          {((!user?.name && paper?.fee === FEES.FREE) ||
            (paper?.fee === FEES.FREE && eligibility?.attemptsRemaining > 0) ||
            (paper?.fee === FEES.PAID &&
              eligibility?.attemptsRemaining > 0)) && (
            <>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                {t.mode}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {/* Exam Mode Card */}
                <button
                  onClick={() => openModeModal("exam")}
                  className="flex flex-col sm:items-start bg-white border-2 border-purple-200 hover:border-purple-500 hover:shadow-lg rounded-xl p-5 lg:p-6 text-left transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="p-3 bg-purple-50 group-hover:bg-purple-100 rounded-lg transition-colors">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                        {t.examMode}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t.examDesc}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Learning Mode Card */}
                <button
                  onClick={() => openModeModal("learning")}
                  className="flex flex-col sm:items-start bg-white border-2 border-purple-200 hover:border-purple-500 hover:shadow-lg rounded-xl p-5 lg:p-6 text-left transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="p-3 bg-purple-50 group-hover:bg-purple-100 rounded-lg transition-colors">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                        {t.learningMode}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t.learningDesc}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}

          {/* Buy Now Section */}
          {(!user?.name && paper?.fee === FEES.PAID) ||
          (paper?.fee === FEES.PAID && eligibility?.isNeedToBuy) ? (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-5 lg:p-6 border border-purple-200">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Buy now
              </h1>
              <button
                onClick={() => handleAddToCart(paper?.subject)}
                className={`flex w-full sm:w-auto items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
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
          ) : null}

          {/* Leaderboard */}
          {highestMarkStudents?.length > 0 && (
            <>
              <hr className="border-gray-200" />
              <div className="flex flex-col w-full p-5 lg:p-6 rounded-xl bg-white border border-purple-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-purple-900">
                    Leaderboard
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  {highestMarkStudents.map((student, i) => (
                    <StudentRankCard
                      key={student?._id}
                      no={i + 1}
                      {...student}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal */}
        {showModeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-4 lg:py-5 border-b border-gray-200 bg-purple-50">
                <div className="flex items-center gap-3">
                  {selectedMode === "exam" ? (
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-700" />
                    </div>
                  ) : (
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-700" />
                    </div>
                  )}
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                    {selectedMode === "exam" ? t.examMode : t.learningMode}
                  </h3>
                </div>
                <button
                  onClick={closeModeModal}
                  className="p-1.5 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-5 lg:px-6 py-4 lg:py-5 overflow-y-auto max-h-[calc(90vh-180px)]">
                <h4 className="text-base font-bold text-gray-900 mb-4">
                  {t.instructions}
                </h4>
                <ol className="space-y-3 mb-5">
                  {(selectedMode === "exam"
                    ? t.examInstructions
                    : t.learningInstructions
                  ).map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="flex-shrink-0 font-bold text-purple-600 text-base">
                        {index + 1}.
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>

                <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-gray-900 text-sm mb-1">
                        {t.importantNote}
                      </h5>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedMode === "exam" ? t.examNote : t.learningNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 lg:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={closeModeModal}
                  className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {t.cancel}
                </button>
                <Link
                  to={`/subjects/${paper.subject.exam.replace("/", "")}/${
                    paper.subject.forSearch
                  }/${paper.subject.medium}-medium/past-paper/${paper?.year}/${
                    paper?._id
                  }/mcq/${selectedMode}`.toLowerCase()}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl">
                    {selectedMode === "exam" ? t.startExam : t.startLearning}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQStartMain;
