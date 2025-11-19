import { useEffect, useState } from "react";
import questionService from "../../../../services/question.service";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import Button from "../../../shared/buttons/Button";
import paperService from "../../../../services/paper.service";
import {
  PAPER_MODES,
  QUESTION_DIFFICULTY_TYPES,
} from "../../../../constants/base";
import { MCQ_EXAM_MARK_PATH } from "../../../../constants/routes";
import config from "../../../../config/aws";
import PageLoader from "../../../shared/loading/PageLoader";
import { BookOpen } from "feather-icons-react"; // ✅ FIXED IMPORT

const PaperLearningMain = () => {
  const [activeQuestion, setActiveQuestion] = useState({});
  const [paper, setPaper] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); // stores selected option (1–4)
  const [checkedQuestions, setCheckedQuestions] = useState(new Set()); // track checked questions
  const [error, setError] = useState("");
  const [answerClarification, setAnswerClarification] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // whether current question is checked
  const [preLoading, setPreLoading] = useState(true);

  const { paperId } = useParams();
  const navigate = useNavigate();

  const { markPaper } = paperService();
  const { getAllQuestionsByPaperId } = questionService();

  // LOAD QUESTIONS
  useEffect(() => {
    const loadQuestions = async () => {
      setPreLoading(true);
      try {
        const res = await getAllQuestionsByPaperId(paperId);

        const qList = res?.data?.questions || [];

        setPaper(res?.data?.paper || null);
        setQuestions(qList);
        setActiveQuestion(qList[0] || {});
        setAnswers(new Array(qList.length).fill(null)); // FIX: null means not answered
        setCheckedQuestions(new Set());
      } catch (err) {
        console.error("Error loading questions: ", err);
      } finally {
        setPreLoading(false);
      }
    };

    if (paperId) loadQuestions();
  }, [paperId]);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /** Select answer */
  const handleSelectAnswer = (index) => {
    if (isChecked) return; // prevent changes after checking

    const updated = [...answers];
    updated[activeQuestion.no - 1] = index + 1;
    setAnswers(updated);
    setError("");
  };

  /** Check answer */
  const handleCheckAnswer = () => {
    const currentIndex = activeQuestion.no - 1;

    if (answers[currentIndex] == null) {
      setError("Please select an answer before checking.");
      return;
    }

    const updatedSet = new Set(checkedQuestions);
    updatedSet.add(activeQuestion.no);
    setCheckedQuestions(updatedSet);

    setIsChecked(true);
    setAnswerClarification(
      questions[currentIndex]?.answerClarification ||
        "No explanation available."
    );

    setError("");
  };

  /** Next question */
  const handleNextQuestion = () => {
    if (!isChecked) {
      setError("Please check the answer first.");
      return;
    }

    const nextNo = activeQuestion.no + 1;
    if (nextNo > questions.length) return;

    const nextQ = questions.find((q) => q.no === nextNo);

    setActiveQuestion(nextQ);

    // restore state for next question
    setIsChecked(checkedQuestions.has(nextNo));
    setAnswerClarification(
      checkedQuestions.has(nextNo)
        ? questions[nextNo - 1]?.answerClarification || ""
        : ""
    );
    setError("");
  };

  /** Previous question */
  const handlePreviousQuestion = () => {
    const prevNo = activeQuestion.no - 1;
    if (prevNo < 1) return;

    const prevQ = questions.find((q) => q.no === prevNo);
    setActiveQuestion(prevQ);

    setIsChecked(checkedQuestions.has(prevNo));
    setAnswerClarification(
      checkedQuestions.has(prevNo)
        ? questions[prevNo - 1]?.answerClarification || ""
        : ""
    );
    setError("");
  };

  const handleSubmitPaper = async (e) => {
    e.preventDefault();
    
    try {
      const res = await markPaper(
        paperId,
        answers.map((ans) => ([ans])),
        timeSpent,
        PAPER_MODES.LEARNING
      );

      if (res?.data?.id) {
        navigate(MCQ_EXAM_MARK_PATH.replace(":markId", res.data.id));
      }
    } catch (err) {
      console.log({ err });
    }
  };

  if (preLoading) return <PageLoader />;

  const index = activeQuestion.no - 1;
  const userAnswer = answers[index];
  const correctAnswer = questions[index]?.answer[0];
  const isCorrect = isChecked && userAnswer === correctAnswer;

  return (
    <div className="flex px-6 md:px-20 pt-10 pb-20">
      <div className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto">
        {/* HEADER */}
        <div className="pb-4 border-b border-b-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            G.C.E {paper?.subject?.exam} - {paper?.subject?.name} ({paper?.year}
            ) - {paper?.subject?.medium}
          </h1>

          <div className="flex flex-wrap gap-2 mt-6">
            {questions.map((_, i) => {
              const answered = answers[i] != null;
              const checked = checkedQuestions.has(i + 1);
              const isRight = answers[i] === questions[i]?.answer[0];

              return (
                <span
                  className={classNames(
                    "flex items-center justify-center w-8 h-8 text-[10px] rounded-full",
                    answered
                      ? checked
                        ? isRight
                          ? "bg-green-100 border border-green-500"
                          : "bg-red-100 border border-red-500"
                        : "bg-purple-100 "
                      : "bg-gray-200",
                    activeQuestion?.no === i + 1
                      ? "border-2 border-purple-700"
                      : ""
                  )}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
        </div>

        {/* QUESTION CARD */}
        <div className="">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Question {activeQuestion.no} &nbsp;
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
            </h2>

            {isChecked && (
              <span
                className={classNames(
                  "px-4 py-2 rounded-full font-semibold",
                  isCorrect
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            )}
          </div>

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

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {activeQuestion.options?.map((opt, idx) => {
              const number = idx + 1;
              const selected = userAnswer === number;
              const right = correctAnswer === number;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={classNames(
                    "p-3 rounded-lg border cursor-pointer transition",
                    isChecked
                      ? right
                        ? "bg-green-100 border-green-500"
                        : selected
                        ? "bg-red-100 border-red-500"
                        : "bg-gray-50 border-gray-300 opacity-70"
                      : selected
                      ? "bg-purple-100 border-purple-500"
                      : "border-purple-200 hover:bg-purple-50 hover:border-purple-500"
                  )}
                >
                  ({number}) &nbsp; {opt}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mt-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {isChecked && answerClarification && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Explanation
                </h4>
                <p className="text-blue-800">{answerClarification}</p>
              </div>
            </div>
          )}
        </div>

        {/* BUTTONS */}
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

          <div className="flex gap-4">
            {!isChecked ? (
              <Button label="Check Answer" handleBtn={handleCheckAnswer} />
            ) : activeQuestion.no < questions.length ? (
              <Button label="Next Question" handleBtn={handleNextQuestion} />
            ) : (
              <Button label="Submit" handleBtn={handleSubmitPaper} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperLearningMain;
