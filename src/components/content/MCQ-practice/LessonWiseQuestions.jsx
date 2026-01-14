import { useEffect, useState } from "react";
import { Lock, Unlock, Calendar, ChevronDown, ChevronUp, X } from "lucide-react";
import questionService from "../../../services/question.service";
import { useParams } from "react-router-dom";
import PageLoader from "../../shared/loading/PageLoader";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import config from "../../../config/aws";

const LessonWiseQuestions = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const { subjectId } = useParams();
  const { getLessonsWiseQuestions } = questionService();

  useEffect(() => {
    const fetchData = async () => {
      if (!subjectId) return;
      setLoading(true);
      try {
        const res = await getLessonsWiseQuestions(subjectId);
        setLessons(res?.data || []);
        // Auto expand first lesson if exists
        if (res?.data?.length > 0) {
          setExpandedLesson(res.data[0].id);
        }
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  const toggleLesson = (lessonId) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  };

  if (loading) return <PageLoader />;

  if (lessons.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No questions available for this subject yet.
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <div>
        <h2 className="text-2xl mt-8 font-bold text-purple-900">
          Lesson-wise Questions
        </h2>
        <p className="mb-5 text-gray-500">
          Past exam questions organized by lesson and year
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const totalQuestions = lesson.years.reduce(
            (sum, y) => sum + y.questions.length,
            0
          );
          const isExpanded = expandedLesson === lesson.id;

          return (
            <div
              key={lesson.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-purple-300"
            >
              {/* Lesson Header */}
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-base font-semibold text-purple-700 bg-purple-100 rounded-full w-10 h-10">
                    {lesson.id}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                      {lesson.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{totalQuestions} questions</span>
                    </div>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp
                    className="text-gray-400 group-hover:text-purple-600 transition-colors"
                    size={22}
                  />
                ) : (
                  <ChevronDown
                    className="text-gray-400 group-hover:text-purple-600 transition-colors"
                    size={22}
                  />
                )}
              </button>

              {/* Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/40">
                  {lesson.years.map((yearData, index) => (
                    <div
                      key={yearData.year}
                      className={
                        index > 0
                          ? yearData.unlocked
                            ? "pt-8 mt-6 border-t border-gray-200"
                            : "mt-4"
                          : ""
                      }
                    >
                      <div
                        className={`flex items-center justify-between ${
                          yearData.unlocked ? "mb-4" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar
                            className={`${
                              yearData.unlocked
                                ? "text-purple-600"
                                : "text-slate-400"
                            }`}
                            size={18}
                          />
                          <h3
                            className={`text-base font-semibold ${
                              yearData.unlocked
                                ? "text-slate-700"
                                : "text-slate-400"
                            }`}
                          >
                            {yearData.year}
                          </h3>
                          {yearData.unlocked ? (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                              {yearData.questions.length}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex-shrink-0 pt-1">
                          {yearData.unlocked ? (
                            <Unlock size={18} className="text-green-500" />
                          ) : (
                            <Lock size={18} className="text-slate-400" />
                          )}
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {yearData.questions.map((q) => (
                          <div
                            key={q.id}
                            onClick={() => q.unlocked && setSelectedQuestion(q)}
                            className={`
                              group flex items-start justify-between p-4 rounded-lg border transition-all duration-150
                              ${
                                q.unlocked
                                  ? "bg-white border-purple-200 hover:border-purple-300 hover:shadow-sm cursor-pointer"
                                  : "bg-gray-50 border-gray-200 cursor-not-allowed opacity-75"
                              }
                            `}
                          >
                            <div className="flex-1 pr-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`font-medium text-sm ${
                                    q.unlocked
                                      ? "text-purple-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  Q{q.id}
                                </span>{" "}
                                <p className="text-sm text-gray-700 line-clamp-1">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                  >
                                    {q.question}
                                  </ReactMarkdown>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Question Modal */}
      {selectedQuestion && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedQuestion(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Q{selectedQuestion.id} ({selectedQuestion?.year})
              </h2>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-8 p-6">
              <div className="flex flex-col gap-5">
                {selectedQuestion?.question !== "." && (
                  <div className="whitespace-pre-wrap">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {selectedQuestion?.question}
                    </ReactMarkdown>
                  </div>
                )}
                {selectedQuestion?.image && (
                  <img
                    className="max-w-3xl"
                    src={`${config.S3_PUBLIC_URL}/${selectedQuestion?.image}`}
                    alt={`MCQ ${selectedQuestion?.type} ${selectedQuestion?.no}`}
                    loading="lazy"
                  />
                )}
                {selectedQuestion?.restOfQuestion && (
                  <div className="whitespace-pre-wrap">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {selectedQuestion.restOfQuestion}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedQuestion?.options &&
                  selectedQuestion?.options?.map((option, index) => (
                    <div
                      key={index}
                      className="flex p-3 rounded-lg cursor-pointer border border-purple-200"
                      onClick={() => handleSelectAnswer(index)}
                    >
                      ({index + 1}) &nbsp;{" "}
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {option}
                      </ReactMarkdown>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonWiseQuestions;
