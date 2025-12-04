import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import PageHeader from "../../../shared/headers/PageHeader";
import questionService from "../../../../services/question.service";
import { ADMIN_QUESTION_CREATE_PATH } from "../../../../constants/routes";
import { Link, useNavigate } from "react-router-dom";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import paperService from "../../../../services/paper.service";
import config from "../../../../config/aws";

const ManageQuestionMain = () => {
  const [paperId, setPaperId] = useState("");
  const [papers, setPapers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [lessonStats, setLessonStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllPapers } = paperService();

  const navigate = useNavigate();

  const {
    getAllQuestionsAndAnswersByPaperId,
    deleteQuestion,
    lessonStatsByPaper,
    updateApprovalStatus,
  } = questionService();

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const res = await getAllPapers();
        const mapped = res?.data?.map((paper) => ({
          value: paper._id,
          label: `${paper?.subject?.name} ${paper?.subject?.exam} ${paper?.subject?.medium} ${paper.year} (${paper?.subject?.type})`,
        }));
        setPapers(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getAllQuestionsAndAnswersByPaperId(paperId);
        console.log("res", res.data);
        setQuestions(res?.data?.questions || []);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchQuestions();
    }
  }, [paperId]);

  useEffect(() => {
    const fetchLessonStats = async () => {
      setLoading(true);
      try {
        const res = await lessonStatsByPaper(paperId);
        console.log("res", res.data);
        setLessonStats(res?.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchLessonStats();
    }
  }, [paperId]);

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      toast.success("Question successfully deleted!");
      const filter = questions.filter((paper) => paper._id !== id);
      setQuestions(filter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApproval = async (question) => {
    const newStatus = question.isApproved === "Yes" ? "No" : "Yes";

    // Optional: update UI immediately (optimistic update)
    const updatedQuestions = questions.map((q) =>
      q._id === question._id ? { ...q, isApproved: newStatus } : q
    );
    setQuestions(updatedQuestions);

    try {
      await updateApprovalStatus(question._id, newStatus);
      // Optional success toast here
    } catch (err) {
      console.error(err);
      // Revert UI if API fails
      setQuestions(questions);
    }
  };

  return (
    <>
      <PageHeader title="Manage Question" />
      <div className="flex w-[500px] mb-7">
        <TypeOrSelect
          isClearable
          label="Filter by Paper"
          name="paperId"
          onChange={(e) => setPaperId(e.target.value)}
          options={papers}
          value={papers.filter((paper) => paper.value === paperId)?.[0]?.label}
          placeholder="-- Select --"
          className="w-full"
        />
      </div>

      {lessonStats.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden max-w-2xl mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100 text-sm">
              <tr>
                <th className="px-4 py-2 text-left font-medium">No.</th>
                <th className="px-4 py-2 text-left font-medium">Lesson Name</th>
                <th className="px-4 py-2 text-right font-medium">Questions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessonStats.map((lesson, index) => (
                <tr key={lesson.lessonId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {lesson.lessonNo}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {lesson.lessonName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                    {lesson.questionCount}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-semibold">
                <td className="px-4 py-2 text-sm text-gray-900" colSpan="2">
                  Total
                </td>
                <td className="px-4 py-2 text-sm text-gray-900 text-right">
                  {questions?.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      {questions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border table-fixed">
            <thead className="bg-purple-100 h-14">
              <tr className="text-sm text-left">
                <th className="w-[50px]">No</th>
                <th className="w-[300px]">Question</th>
                <th className="w-[150px]">Answer option</th>
                <th className="w-[80px]">Correct answer</th>
                <th className="w-[400px]">Answer Clarification</th>
                <th className="w-[100px]">Difficulty</th>
                <th className="w-[100px]">Is Approved</th>
                <th className="w-[150px]">Lesson</th>
                <th className="w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : questions?.length > 0 ? (
                questions.map((question, index) => (
                  <tr key={index} className="text-sm">
                    <td className="px-4 py-3">{question.no}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{question.question}</span>
                        {question.image && (
                          <img
                            src={`${config.S3_PUBLIC_URL}/${question.image}`}
                            alt="Question"
                            className="mt-2 max-w-[200px] rounded"
                          />
                        )}
                        {question.restOfQuestion && (
                          <span className="text-gray-600">
                            {question.restOfQuestion}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {question.options.map((option, i) => (
                          <span key={i} className="text-gray-700">
                            {i + 1}. {option}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {question.answer.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {question.answerClarification}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                ${
                  question.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : question.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
                      >
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={question.isApproved === "Yes"}
                            onChange={() => handleToggleApproval(question)}
                            className="sr-only peer"
                          />
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
        peer-checked:after:translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:bg-green-500"
                          ></div>
                        </label>

                        <span
                          className={`text-xs font-medium ${
                            question.isApproved === "Yes"
                              ? "text-green-700"
                              : "text-orange-700"
                          }`}
                        >
                          {question.isApproved === "Yes"
                            ? "Approved"
                            : "Pending"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-gray-700">
                      {question?.lesson?.lesson || "N/A"}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700"
                          to={`${ADMIN_QUESTION_CREATE_PATH}/${question._id}`}
                          target="_blank"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <div
                          className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                          onClick={() => handleDeleteQuestion(question._id)}
                        >
                          <Trash size={16} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default ManageQuestionMain;
