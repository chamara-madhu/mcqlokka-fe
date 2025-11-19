import React, { useEffect, useState } from "react";
import { BookOpen, Play, TrendingUp, Award } from "feather-icons-react";
import { Link } from "react-router-dom";
import markService from "../../../../services/mark.service";
import { HOME_PATH } from "../../../../constants/routes";
import { EXAMS } from "../../../../constants/base";
import PageLoader from "../../../shared/loading/PageLoader";

const MySubjectsMain = () => {
  const [subjects, setSubjects] = useState([]);
  const [preLoading, setPreLoading] = useState(true);
  const { getAllMySubjects } = markService();

  useEffect(() => {
    const fetchData = async () => {
      setPreLoading(true);
      try {
        const res = await getAllMySubjects();
        setSubjects(res.data);
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

  const getStatusBadge = (status) => {
    const config = {
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Completed",
      },
      "in-progress": {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "In Progress",
      },
      "not-started": {
        bg: "bg-gray-100",
        text: "text-gray-700",
        label: "Not Started",
      },
      "max-attempts-reached": {
        bg: "bg-gray-100",
        text: "text-gray-700",
        label: "Not Started",
      },
    };
    const { bg, text, label } = config[status];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
      >
        {label}
      </span>
    );
  };

  
  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              My Subjects
            </h1>
            <p className="text-gray-600">
              Access your purchased subjects and track your progress
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-lg">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-600">
              {subjects.length} Subjects
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Subjects</span>
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.length}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Progress</span>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.length
                ? Math.round(
                    subjects.reduce((sum, s) => sum + s.progress, 0) /
                      subjects.length
                  )
                : 0}
              %
            </p>
          </div>

          <div className="bg-white rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completed</span>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.reduce((sum, s) => sum + s.completedPapers, 0)}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Marks</span>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {subjects.length
                ? Math.round(
                    subjects.reduce((sum, s) => sum + s.avgMarks, 0) /
                      subjects.length
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subjects.map((subject, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden group"
          >
            {/* Subject Header */}
            <div className="bg-purple-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-white rounded-full text-black text-xs font-semibold">
                      {subject.type}
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-black text-xs font-semibold">
                      {subject.medium}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-purple-800 text-sm">
                    G.C.E{" "}
                    {subject.exam === EXAMS.AL
                      ? "Advanced Level"
                      : "Ordinary Level"}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-900 font-medium">
                    Overall Progress
                  </span>
                  <span className="text-sm text-purple-600 font-bold">
                    {subject.progress}%
                  </span>
                </div>
                <div className="w-full bg-purple-600 bg-opacity-20 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Subject Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {subject.completedPapers}/{subject.totalPapers}
                  </p>
                  <p className="text-xs text-gray-600">Papers Done</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-2xl font-bold text-purple-600">
                    {subject.avgMarks}
                  </p>
                  <p className="text-xs text-gray-600">Avg Marks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {subject.papers.length}
                  </p>
                  <p className="text-xs text-gray-600">Total Papers</p>
                </div>
              </div>

              {/* Recent Papers */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Available Papers
                </h4>
                <div className="space-y-2">
                  {subject.papers.map((paper, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <Link
                        to={`/mcq/${paper.id}`}
                        target="_blank"
                        className="text-sm hover:text-purple-600 text-gray-900"
                      >
                        {paper.year} paper
                      </Link>
                      <div className="flex items-center space-x-2">
                        {paper.marks && (
                          <span className="text-xs font-semibold text-purple-600">
                            {Math.floor(paper.marks)}%
                          </span>
                        )}
                        {getStatusBadge(paper.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <Link to={`/subjects/${subject.id}`}>
                <button className="flex w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Continue</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {subjects.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Subjects Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start your learning journey by purchasing your first subject
          </p>
          <Link to={HOME_PATH}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Browse Subjects
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MySubjectsMain;
