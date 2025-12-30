import { useEffect, useState } from "react";
import questionService from "../../../../services/question.service";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import Button from "../../../shared/buttons/Button";
import paperService from "../../../../services/paper.service";
import {
  MEDIUMS,
  PAPER_MODES,
  QUESTION_DIFFICULTY_TYPES,
  USER_ROLES,
} from "../../../../constants/base";
import { MCQ_EXAM_RESULTS_PATH } from "../../../../constants/routes";
import config from "../../../../config/aws";
import PageLoader from "../../../shared/loading/PageLoader";
import { Clock } from "lucide-react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const PaperMain = () => {
  const [activeQuestion, setActiveQuestion] = useState({});
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const [preLoading, setPreLoading] = useState(true);
  const { paperId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const { markPaper } = paperService();
  const { getAllQuestionsByPaperId } = questionService();

  useEffect(() => {
    const fetchQuestions = async () => {
      setPreLoading(true);
      const res = await getAllQuestionsByPaperId(paperId);
      setPaper(res?.data?.paper || null);
      setQuestions(res?.data?.questions || []);
      setActiveQuestion(res?.data?.questions?.[0] || {});
      setAnswers(new Array(res?.data?.questions?.length).fill([])); // Initialize answers array
      setTimeLeft(res?.data?.questions?.length * 144);
      setPreLoading(false);
    };

    if (paperId) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAnswer = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[activeQuestion.no - 1] = [index + 1]; // Store answer for current question number
    setAnswers(updatedAnswers);
  };

  // Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitPaper();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handlePreviousQuestion = () => {
    if (activeQuestion.no === 1) return;
    window.scrollTo(0, 0);

    const nextQ = questions.filter(
      (question) => question.no === activeQuestion.no - 1
    );

    if (nextQ?.length) {
      setActiveQuestion(nextQ[0]);
    }
  };

  const handleNextQuestion = () => {
    if (questions?.length === activeQuestion.no) return;
    window.scrollTo(0, 0);

    const nextQ = questions.filter(
      (question) => question.no === activeQuestion.no + 1
    );

    if (nextQ?.length) {
      setActiveQuestion(nextQ[0]);
    }
  };

  const handleSelectQuestion = (no) => {
    window.scrollTo(0, 0);

    const nextQ = questions.filter((question) => question.no === no);

    if (nextQ?.length) {
      setActiveQuestion(nextQ[0]);
    }
  };

  const handleSubmitPaper = async (e) => {
    e.preventDefault();

    try {
      const res = await markPaper(
        paperId,
        answers,
        timeSpent,
        PAPER_MODES.EXAM
      );

      if (res?.data?.id) {
        navigate(MCQ_EXAM_RESULTS_PATH.replace(":markId", res.data.id));
      }
    } catch (err) {
      console.log({ err });
    }
  };

  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto">
        <div className="flex flex-col gap-4 pb-4 border-b border-b-gray-200">
          {/* Title and Timer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
                G.C.E {paper?.subject?.exam} - {paper?.subject?.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {paper?.year} -{" "}
                {paper?.subject?.medium === MEDIUMS.ENGLISH
                  ? "English Medium"
                  : "සිංහල මාධ්‍යය"}
              </p>
            </div>

            {/* Timer */}
            <div
              className={classNames(
                "flex items-center gap-2 text-base lg:text-lg font-bold px-4 py-2 rounded-lg shadow-sm",
                timeLeft < 300
                  ? "bg-red-500 text-white animate-pulse"
                  : timeLeft < 600
                  ? "bg-orange-500 text-white"
                  : "bg-green-500 text-white"
              )}
            >
              <Clock className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {answers?.map((answer, i) => (
              <span
                className={classNames(
                  "flex items-center justify-center w-8 h-8 text-[10px] rounded-full cursor-pointer hover:bg-purple-200",
                  answer?.length > 0
                    ? "bg-purple-200 border border-purple-500"
                    : "bg-gray-200",
                  activeQuestion?.no === i + 1
                    ? "border-2 border-purple-700"
                    : ""
                )}
                key={i}
                onClick={() => handleSelectQuestion(i + 1)}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        {activeQuestion?.type && (
          <div className="flex flex-col gap-8">
            <h5 className="text-lg mb-[-20px] font-semibold">
              {paper?.subject?.medium === MEDIUMS.ENGLISH
                ? "Question"
                : "ප්‍රශ්නය"}{" "}
              : {activeQuestion?.no} &nbsp;
              {/* <span
                className={classNames(
                  "px-3 py-1 text-sm font-medium rounded-full",
                  activeQuestion?.difficulty === QUESTION_DIFFICULTY_TYPES?.EASY
                    ? "bg-green-200"
                    : activeQuestion?.difficulty ===
                      QUESTION_DIFFICULTY_TYPES?.MEDIUM
                    ? "bg-orange-200"
                    : "bg-red-200"
                )}
              >
                {activeQuestion?.difficulty}
              </span> */}
            </h5>
            <div className="flex flex-col gap-5">
              {activeQuestion?.question !== "." && (
                <div className="whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {activeQuestion?.question}
                  </ReactMarkdown>
                </div>
              )}
              {activeQuestion?.image && (
                <img
                  className="max-w-3xl"
                  src={`${config.S3_PUBLIC_URL}/${activeQuestion?.image}`}
                  alt={`MCQ ${activeQuestion?.type} ${activeQuestion?.no}`}
                />
              )}
              {activeQuestion?.restOfQuestion && (
                <div className="whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {activeQuestion.restOfQuestion}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuestion?.options &&
                activeQuestion?.options?.map((option, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex p-3 rounded-lg cursor-pointer border",
                      answers[activeQuestion.no - 1]?.filter(
                        (answer) => answer === index + 1
                      )?.length
                        ? "bg-purple-100 border-purple-500"
                        : "border-purple-200 hover:bg-purple-50 hover:border-purple-500"
                    )}
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
        )}

        {user?.role === USER_ROLES.ADMIN &&
        activeQuestion?.answerClarification ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                {paper?.subject?.medium === MEDIUMS.ENGLISH
                  ? "Explanation"
                  : "පැහැදිලි කිරීම"}
              </h4>
              <div className="text-blue-800 whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {activeQuestion?.answerClarification}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={classNames(
            "flex",
            activeQuestion?.no === 1 ? "justify-end" : "justify-between"
          )}
        >
          {activeQuestion?.no !== 1 && (
            <Button
              label="Previous"
              color="secondary"
              handleBtn={handlePreviousQuestion}
              size="large"
            />
          )}
          {questions?.length === activeQuestion?.no ? (
            <Button label="Submit" handleBtn={handleSubmitPaper} size="large" />
          ) : (
            <Button label="Next" handleBtn={handleNextQuestion} size="large" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperMain;
