import React, { useEffect, useState } from "react";
import {
  Award,
  RefreshCw,
  BarChart2,
  CheckCircle,
  Clock,
  Calendar,
  Eye,
} from "feather-icons-react";
import markService from "../../../../services/mark.service";
import PageLoader from "../../../shared/loading/PageLoader";

const MyResultsMain = () => {
  const [results, setResults] = useState([]);
  const [preLoading, setPreLoading] = useState(false);

  const { getAllMyResults } = markService();

  useEffect(() => {
    const fetchData = async () => {
      setPreLoading(true);
      try {
        const res = await getAllMyResults();
        setResults(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setPreLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getGradeInfo = (marks) => {
    if (marks >= 75)
      return {
        grade: "A",
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    if (marks >= 65)
      return {
        grade: "B",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
      };
    if (marks >= 55)
      return {
        grade: "C",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
      };
    if (marks >= 40)
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

  const getMedalInfo = (medal) => {
    if (medal === 1)
      return { name: "Gold", color: "text-yellow-600", icon: "🥇" };
    if (medal === 2)
      return { name: "Silver", color: "text-gray-500", icon: "🥈" };
    if (medal === 3)
      return { name: "Bronze", color: "text-orange-700", icon: "🥉" };
    return null;
  };

  if (preLoading) {
    return <PageLoader />;
  }

  const avgScore =
    results.length > 0
      ? (results.reduce((sum, r) => sum + r.marks, 0) / results.length).toFixed(
          1
        )
      : 0;

  const totalAttempts = results.length;
  const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
  const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Exam Results
          </h1>
          <p className="text-gray-600">
            Track your performance and progress over time
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Total Attempts
              </span>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalAttempts}</p>
            <p className="text-xs text-gray-500 mt-1">Exams completed</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Average Score
              </span>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{avgScore}%</p>
            <p className="text-xs text-gray-500 mt-1">Overall performance</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Total Correct
              </span>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalCorrect}</p>
            <p className="text-xs text-gray-500 mt-1">
              Out of {totalQuestions} questions
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                Medals Earned
              </span>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {results.filter((r) => r.medal).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Achievements unlocked</p>
          </div>
        </div>

        {/* Results List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Exam History
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              View detailed results for each attempt
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {results.length > 0 ? (
              results.map((result, index) => {
                const gradeInfo = getGradeInfo(result.marks);
                const medalInfo = getMedalInfo(result.medal);

                return (
                  <div
                    key={result._id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Left Section - Exam Info */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {result.paper.longName}
                            </h3>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(result.createdAt)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatTime(result.timeSpent)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Stats */}
                      <div className="flex items-center space-x-6">
                        {medalInfo && (
                          <div className="text-center">
                            <div className="text-3xl mb-1">
                              {medalInfo.icon}
                            </div>
                            <p
                              className={`text-xs font-semibold ${medalInfo.color}`}
                            >
                              {medalInfo.name}
                            </p>
                          </div>
                        )}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {result.marks.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-600">Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {result.correctAnswers}/{result.totalQuestions}
                          </p>
                          <p className="text-xs text-gray-600">Correct</p>
                        </div>
                        <div className="text-center">
                          <div
                            className={`inline-block px-4 py-2 rounded-lg ${gradeInfo.bg} border ${gradeInfo.border}`}
                          >
                            <span
                              className={`text-xl font-bold ${gradeInfo.color}`}
                            >
                              {gradeInfo.grade}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Action */}
                      <div>
                        <button
                          onClick={() =>
                            (window.location.href = `/subjects/mcq/marks/${result._id}`)
                          }
                          className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 ml-16">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${result.marks}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Results Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start taking exams to see your results here
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Browse Subjects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyResultsMain;
