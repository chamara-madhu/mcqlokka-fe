import { useEffect, useState } from "react";
import questionService from "../../../../services/question.service";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import Button from "../../../shared/buttons/Button";
import paperService from "../../../../services/paper.service";
import { QUESTION_DIFFICULTY_TYPES } from "../../../../constants/base";
import { MCQ_EXAM_MARK_PATH } from "../../../../constants/routes";
import config from "../../../../config/aws";

const PaperMain = () => {
  const [activeQuestion, setActiveQuestion] = useState({});
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const { paperId } = useParams();
  const navigate = useNavigate();

  const { markPaper } = paperService();
  const { getAllQuestionsByPaperId } = questionService();

  console.log("activeQuestion", activeQuestion);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getAllQuestionsByPaperId(paperId);
      console.log({ res });
      setPaper(res?.data?.paper || null);
      setQuestions(res?.data?.questions || []);
      setActiveQuestion(res?.data?.questions?.[0] || {});
      setAnswers(new Array(res?.data?.questions?.length).fill([])); // Initialize answers array
      setTimeLeft(res?.data?.questions?.length * 144)
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

    const nextQ = questions.filter(
      (question) => question.no === activeQuestion.no - 1
    );

    if (nextQ?.length) {
      setActiveQuestion(nextQ[0]);
    }
  };

  const handleNextQuestion = () => {
    if (questions?.length === activeQuestion.no) return;

    const nextQ = questions.filter(
      (question) => question.no === activeQuestion.no + 1
    );

    if (nextQ?.length) {
      setActiveQuestion(nextQ[0]);
    }
  };

  const handleSubmitPaper = async (e) => {
    e.preventDefault();

    try {
      const res = await markPaper(paperId, answers, timeSpent);

      if (res?.data?.id) {
        navigate(MCQ_EXAM_MARK_PATH.replace(":markId", res.data.id));
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="flex px-20 pt-10 pb-20">
      <div className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto">
        <div className="flex flex-col gap-4">
          {/* Timer Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              G.C.E {paper?.exam} - {paper?.year} - {paper?.medium}
            </h1>
            <div
              className={classNames(
                "text-lg font-bold px-4 py-2 rounded-lg",
                timeLeft < 300 ? "bg-red-500 text-white" : "bg-green-200"
              )}
            >
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {answers?.map((answer, i) => (
              <span
                className={classNames(
                  "flex items-center justify-center w-8 h-8 text-[10px] rounded-full",
                  answer?.length > 0
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200",
                  activeQuestion?.no === i + 1
                    ? "border-2 border-purple-700"
                    : ""
                )}
                key={i}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        {activeQuestion?.type && (
          <div className="flex flex-col gap-8">
            <h5 className="text-lg mb-[-20px] font-semibold">
              Question : {activeQuestion?.no} &nbsp;
              <span
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
              </span>
            </h5>
            <div className="flex flex-col gap-5">
              <p className="whitespace-pre-wrap">{activeQuestion?.question}</p>
              {activeQuestion?.image && (
                <img
                  className="max-w-[600px]"
                  src={`${config.S3_PUBLIC_URL}/${activeQuestion?.image}`}
                  alt={`MCQ ${activeQuestion?.type} ${activeQuestion?.no}`}
                />
              )}
              {activeQuestion?.restOfQuestion && (
                <p className="whitespace-pre-wrap">
                  {activeQuestion.restOfQuestion}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {activeQuestion?.options &&
                activeQuestion?.options?.map((option, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex p-3  rounded-lg cursor-pointer hover:bg-purple-400",
                      answers[activeQuestion.no - 1]?.filter(
                        (answer) => answer === index + 1
                      )?.length
                        ? "bg-purple-400"
                        : "bg-purple-100"
                    )}
                    onClick={() => handleSelectAnswer(index)}
                  >
                    ({index + 1}) &nbsp; {option}
                  </div>
                ))}
            </div>
          </div>
        )}

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
            />
          )}
          {questions?.length === activeQuestion?.no ? (
            <Button label="Submit" handleBtn={handleSubmitPaper} />
          ) : (
            <Button label="Next" handleBtn={handleNextQuestion} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperMain;
