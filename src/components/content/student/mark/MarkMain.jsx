import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Award,
  Clock,
  BookOpen,
  Download,
  TrendingUp,
  Loader,
} from "feather-icons-react";
import questionService from "../../../../services/question.service";
import markService from "../../../../services/mark.service";
import PageLoader from "../../../shared/loading/PageLoader";
import { formatTimeSpent } from "../../../../utils/general";

const MarkMain = () => {
  const [marks, setMarks] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [preLoading, setPreLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const { getMarksByMarkId } = markService();
  const { getAllQuestionsAndAnswersByPaperId } = questionService();

  const { markId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPreLoading(true);
        // Replace with your actual API calls
        const res = await getMarksByMarkId(markId);
        const result = await getAllQuestionsAndAnswersByPaperId(
          res.data.paper._id
        );
        setQuestions(result?.data?.questions || []);
        setMarks(res?.data || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setPreLoading(false);
      }
    };

    if (markId) {
      fetchData();
    }
  }, [markId]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const node = document.getElementById("my-node");
      // Add your download logic here
      // await html2PDF(node, { ... });
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloading(false);
    }
  };

  const getGradeInfo = () => {
    const score = marks?.marks || 0;
    if (score >= 75)
      return {
        grade: "A",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    if (score >= 65)
      return {
        grade: "B",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
      };
    if (score >= 55)
      return {
        grade: "C",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
      };
    if (score >= 40)
      return {
        grade: "S",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      };
    return {
      grade: "F",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  };

  if (preLoading) {
    return <PageLoader />;
  }

  if (!marks) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No results found</p>
        </div>
      </div>
    );
  }

  const getMedalInfo = (medal) => {
    if (medal === 1)
      return { name: "Gold", color: "text-yellow-600", icon: "🥇" };
    if (medal === 2)
      return { name: "Silver", color: "text-gray-500", icon: "🥈" };
    if (medal === 3)
      return { name: "Bronze", color: "text-orange-700", icon: "🥉" };
    return null;
  };

  const gradeInfo = getGradeInfo();
  const accuracy =
    marks?.totalQuestions > 0
      ? ((marks?.correctAnswers / marks?.totalQuestions) * 100).toFixed(0)
      : 0;
  const unansweredPect =
    marks?.totalQuestions > 0
      ? (
          ((marks?.unansweredQuestions || 0) / marks?.totalQuestions) *
          100
        ).toFixed(0)
      : 0;

  const medalInfo = getMedalInfo(marks?.medal);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="my-node">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {marks?.paper?.longName || "Exam Results"}
              </h1>
              <p className="text-sm text-gray-600">
                Completed on{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {/* <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm"
            >
              {downloading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </>
              )}
            </button> */}
          </div>
        </div>

        {/* Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* Score Display */}
          <div className="p-8 lg:col-span-1">
            <div className="text-center">
              {medalInfo && (
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-50 mb-4">
                  <div className="text-center">
                    <p className={`text-xs font-semibold ${medalInfo.color}`}>
                      {medalInfo.name}
                    </p>
                    <div className="text-6xl mb-1">{medalInfo.icon}</div>
                  </div>
                </div>
              )}
              <h2 className="text-sm font-medium text-gray-600 mb-2">
                Your Score
              </h2>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {marks?.marks?.toFixed(0) || 0}%
              </div>
              <div
                className={`inline-block px-4 py-2 rounded-full ${gradeInfo.bg} mb-4`}
              >
                <span className={`text-2xl font-bold ${gradeInfo.color}`}>
                  Grade {gradeInfo.grade}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="p-8 lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">
              Performance Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="text-sm text-gray-600">Correct</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {marks?.correctAnswers || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">{accuracy}%</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-3 h-3 text-red-600" />
                  <span className="text-sm text-gray-600">Incorrect</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {(marks?.totalQuestions || 0) -
                    (marks?.correctAnswers || 0) -
                    (marks?.unansweredQuestions || 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {(100 - Number(accuracy) - Number(unansweredPect)).toFixed(0)}
                  %
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <XCircle className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-600">Unanswered</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {marks?.unansweredQuestions || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">{unansweredPect}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-600">Time</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {formatTimeSpent(marks?.timeSpent)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total duration</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-3 h-3 text-gray-600" />
                  <span className="text-sm text-gray-600">Questions</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {marks?.totalQuestions || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total items</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{marks?.marks?.toFixed(0) || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${marks?.marks || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Summary Overview</h2>
          <p className="text-sm text-gray-600 mt-1">
            See all questions at a glance: correct vs incorrect
          </p>
        </div>

        {/* Summary Grid */}
        <div className="p-6 flex flex-wrap gap-3">
          {questions.map((question, index) => {
            const userAnswers = marks?.answers?.[question.no - 1] || [];
            const correctAnswers = question.answer || [];
            const isCorrect = userAnswers[0] === correctAnswers[0];

            return (
              <div
                key={index}
                className={`flex w-12 h-12 rounded-xl gap-1 items-center justify-center
            ${
              userAnswers.length === 0
                ? "bg-gray-100"
                : isCorrect
                ? "bg-green-100"
                : "bg-red-100"
            }`}
                onClick={() => {
                  // OPTIONAL: scroll to specific question
                  document
                    .getElementById(`question-${question.no}`)
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                <span className="text-sm font-bold text-gray-900">
                  {question.no}
                </span>
                {userAnswers.length === 0 ? (
                  <XCircle className="w-4 h-4 text-gray-600" />
                ) : isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Questions Review */}
      {questions && questions.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-gray-900">Detailed Review</h2>
            <p className="text-sm text-gray-600 mt-1">
              Review all {questions.length} questions with correct answers and
              explanations
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {questions.map((question, qIndex) => {
              const userAnswers = marks?.answers?.[question.no - 1] || [];
              const correctAnswers = question.answer || [];
              const isCorrect = userAnswers[0] === correctAnswers[0];

              return (
                <div key={question._id || qIndex} className="p-6">
                  {/* Question Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        userAnswers?.length === 0
                          ? "bg-gray-100"
                          : isCorrect
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {userAnswers?.length === 0 ? (
                        <XCircle className="w-6 h-6 text-gray-600" />
                      ) : isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-lg font-bold text-gray-900">
                          Question {question.no}
                        </span>
                        {question.difficulty && (
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              question.difficulty === "Easy"
                                ? "bg-green-100 text-green-700"
                                : question.difficulty === "Medium"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                        {question.question}
                      </p>
                      {question.image && (
                        <img
                          src={question.image}
                          alt={`Question ${question.no}`}
                          className="mt-4 max-w-full rounded-lg border border-gray-200"
                        />
                      )}
                      {question.restOfQuestion && (
                        <p className="mt-4 text-gray-900 whitespace-pre-wrap">
                          {question.restOfQuestion}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  {question.options && question.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 ml-14">
                      {question.options.map((option, optIndex) => {
                        const optionNumber = optIndex + 1;
                        const isCorrectOption =
                          correctAnswers.includes(optionNumber);
                        const isUserOption = userAnswers.includes(optionNumber);

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 text-sm rounded-lg border-2 flex items-center space-x-3 ${
                              isCorrectOption
                                ? "border-green-400 bg-green-50 text-green-900"
                                : isUserOption
                                ? "border-red-400 bg-red-50 text-red-900"
                                : "border-purple-200"
                            }`}
                          >
                            <div>({optionNumber})</div>
                            <span>{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation */}
                  {question.answerClarification && (
                    <div className="ml-14 bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900 mb-2">
                            Explanation
                          </h4>
                          <p className="text-sm text-blue-800 leading-relaxed">
                            {question.answerClarification}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkMain;
