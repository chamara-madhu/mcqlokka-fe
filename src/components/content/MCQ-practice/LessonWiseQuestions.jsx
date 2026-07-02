import { useEffect, useState, useCallback } from "react";
import {
  Lock,
  Unlock,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import questionService from "../../../services/question.service";
import lessonsWiseQuestionService from "../../../services/lessonWiseQuestion.service";
import { useParams } from "react-router-dom";
import PageLoader from "../../shared/loading/PageLoader";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import config from "../../../config/aws";
import classNames from "classnames";
import Button from "../../shared/buttons/Button";

const LessonWiseQuestions = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Modal states
  const [answer, setAnswer] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const { subjectId } = useParams();

  const questionSvc = questionService();
  const lessonSvc = lessonsWiseQuestionService();

  const fetchData = async () => {
    if (!subjectId) return;
    setLoading(true);
    try {
      const res = await questionSvc.getLessonsWiseQuestions(subjectId);
      const data = res?.data || [];
      setLessons(data);

      if (data.length > 0 && !expandedLesson) {
        setExpandedLesson(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data
  useEffect(() => {
    fetchData();
  }, [subjectId]);

  // Reset modal when question changes
  useEffect(() => {
    if (selectedQuestion) {
      setAnswer(null);
      setIsChecked(false);
      setError("");
    }
  }, [selectedQuestion]);

  const toggleLesson = (lessonId) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  };

  const handleSelectAnswer = (index) => {
    if (isAlreadyAnswered) return; // Prevent selecting if already answered
    setAnswer(index + 1);
    setError("");
  };

  const handleCheckAnswer = useCallback(async () => {
    if (!answer) {
      setError("Please select an answer before checking.");
      return;
    }

    try {
      const res = await lessonSvc.create(selectedQuestion._id, { answer });

      // Update the question in list
      setLessons((prevLessons) =>
        prevLessons.map((lesson) => ({
          ...lesson,
          years: lesson.years.map((yearData) => ({
            ...yearData,
            questions: yearData.questions.map((q) =>
              q._id === selectedQuestion._id
                ? { ...q, userAnswer: [answer]}
                : q
            ),
          })),
        }))
      );

      // Refresh selected question with new data
      setSelectedQuestion((prev) => ({
        ...prev,
        userAnswer: [answer],
      }));

      setIsChecked(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit answer. Please try again.");
    }
  }, [answer, selectedQuestion, lessonSvc]);

  const closeModal = () => setSelectedQuestion(null);

  // Check if question is already answered
  const isAlreadyAnswered = !!selectedQuestion?.userAnswer?.[0];

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
      <div className="mb-8">
        <h2 className="text-2xl mt-8 font-bold text-purple-900">
          Lesson-wise Questions (Beta)
        </h2>
        <p className="mb-5 text-gray-500">
          Past exam questions organized by lesson and year
        </p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const totalQuestions = lesson.years.reduce(
            (sum, y) => sum + (y.questions?.length || 0),
            0,
          );
          const isExpanded = expandedLesson === lesson.id;

          return (
            <div
              key={lesson.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-base font-semibold text-purple-700 bg-purple-100 rounded-full w-10 h-10">
                    {lesson.id}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800 group-hover:text-purple-700">
                      {lesson.title}
                    </h2>
                    <div className="text-sm text-gray-500">
                      {totalQuestions} questions
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={22} />
                ) : (
                  <ChevronDown size={22} />
                )}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/40">
                  {lesson.years.map((yearData, index) => (
                    <div
                      key={yearData.year}
                      className={
                        index > 0 ? "pt-8 mt-6 border-t border-gray-200" : ""
                      }
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Calendar
                            className={
                              yearData.unlocked
                                ? "text-purple-600"
                                : "text-slate-400"
                            }
                            size={18}
                          />
                          <h3
                            className={`text-base font-semibold ${yearData.unlocked ? "text-slate-700" : "text-slate-400"}`}
                          >
                            {yearData.year}
                          </h3>
                        </div>
                        {yearData.unlocked ? (
                          <Unlock size={18} className="text-green-500" />
                        ) : (
                          <Lock size={18} className="text-slate-400" />
                        )}
                      </div>

                      <div className="grid gap-3">
                        {yearData.questions.map((q) => (
                          <div
                            key={q._id}
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
                                  Q{q.no}
                                </span>{" "}
                                <p className="text-sm text-gray-700 line-clamp-1">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkMath]}
                                    rehypePlugins={[rehypeKatex]}
                                  >
                                    {q.question}
                                  </ReactMarkdown>
                                </p>
                                {q?.userAnswer && (
                                  <div
                                    className={`px-4 py-1.5 rounded-full w-fit font-semibold text-center ${
                                      q?.userAnswer?.[0] === q.answer?.[0]
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {q?.userAnswer?.[0] === q.answer?.[0]
                                      ? "Correct"
                                      : "Incorrect"}
                                  </div>
                                )}
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

      {/* ==================== QUESTION MODAL ==================== */}
      {selectedQuestion && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">
                  Q{selectedQuestion.no} ({selectedQuestion?.year})
                </h2>
                {/* Already Answered Result */}
                {isAlreadyAnswered && (
                  <div
                    className={`px-4 py-1.5 rounded-full w-fit font-semibold text-center ${
                      selectedQuestion.userAnswer[0] ===
                      selectedQuestion.answer?.[0]
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedQuestion.userAnswer[0] ===
                    selectedQuestion.answer?.[0]
                      ? "Correct"
                      : "Incorrect"}
                  </div>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-xl text-gray-500 hover:text-gray-800"
              >
                <X />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-8">
              {/* Question Text */}
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

              {selectedQuestion.image && (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedQuestion.options?.map((opt, idx) => {
                  const number = idx + 1;
                  const isSelected = answer === number;
                  const isCorrect = selectedQuestion.answer?.[0] === number;
                  const isUserAnswer =
                    selectedQuestion.userAnswer?.[0] === number;

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      className={classNames(
                        "flex p-4 rounded-xl border-2 transition-all",
                        isAlreadyAnswered
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : isUserAnswer
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200"
                          : isSelected
                            ? "border-purple-600 bg-purple-50"
                            : "border-purple-200 hover:border-purple-400 hover:bg-purple-50 cursor-pointer",
                      )}
                    >
                      ({idx + 1}) &nbsp;{" "}
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {opt}
                      </ReactMarkdown>
                    </div>
                  );
                })}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              {/* Explanation - Show only after answer */}
              {isAlreadyAnswered && selectedQuestion.answerClarification && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Explanation
                  </h4>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {selectedQuestion.answerClarification}
                  </ReactMarkdown>
                </div>
              )}

              {/* Submit Button - Only show if NOT answered yet */}
              {!isAlreadyAnswered && (
                <div className="flex justify-end">
                  <Button
                    label="Check Answer"
                    handleBtn={handleCheckAnswer}
                    size="large"
                    disabled={!answer}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonWiseQuestions;
