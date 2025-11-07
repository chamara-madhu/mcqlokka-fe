import { useEffect, useState } from "react";
import markService from "../../../../services/mark.service";
import { useParams } from "react-router-dom";
import html2PDF from "jspdf-html2canvas";
import Button from "../../../shared/buttons/Button";
import Medal from "../../../shared/Medal";
import classNames from "classnames";
import { QUESTION_DIFFICULTY_TYPES } from "../../../../constants/base";
import questionService from "../../../../services/question.service";
import { formatTimeSpent } from "../../../../utils/general";

const MarkMain = () => {
  const [marks, setMarks] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { markId } = useParams();

  const { getMarksByMarkId } = markService();
  const { getAllQuestionsAndAnswersByPaperId } = questionService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMarksByMarkId(markId);
      const result = await getAllQuestionsAndAnswersByPaperId(
        res.data.paper._id
      );
      console.log({ res });
      setQuestions(result?.data?.questions || []);
      console.log({ res });
      setMarks(res?.data || null);
    };

    if (markId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    setLoading(true);

    const node = document.getElementById("my-node");

    html2PDF(node, {
      jsPDF: {
        format: "a6",
      },
      imageType: "image/jpeg",
      output: `./${marks?.paper?.longName}.pdf`,
    });

    setLoading(false);
  };

  return (
    <div className="flex px-20 pt-10 pb-20">
      <div
        className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto"
        id="my-node"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-purple-600">
            {marks?.paper?.longName || "Exam Results"}
          </h1>
          <p className="text-lg text-gray-500">
            Here is your performance summary!
          </p>
          <p className="text-lg"><span className="font-medium">Time Spent:</span> {formatTimeSpent(marks?.timeSpent)}</p>
        </div>

        {/* Medal Section */}
        {marks?.medal && (
          <div className="flex items-center justify-center mt-6">
            <Medal medal={marks.medal} className="w-[100px]" />
          </div>
        )}

        {/* Performance Summary */}
        <div className="grid grid-cols-1 gap-10 mt-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 p-5 bg-purple-100 rounded-xl">
            <h2 className="text-4xl font-bold text-purple-700">
              {marks?.correctAnswers || 0} / {marks?.totalQuestions || 0}
            </h2>
            <p className="text-lg font-medium text-purple-600">
              Correct Answers
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-5 bg-green-100 rounded-xl">
            <h2 className="text-4xl font-bold text-green-700">
              {marks?.marks?.toFixed(2) || 0}%
            </h2>
            <p className="text-lg font-medium text-green-600">Total Score</p>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <p className="text-sm text-gray-500">Download the Result Sheet.</p>
          <Button
            label="Download"
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            handleBtn={handleDownload}
            isLoading={loading}
          />
        </div>

        {questions.map((question, index) => (
          <div className="flex flex-col gap-8" key={index}>
            <h5 className="text-lg mb-[-20px] font-semibold">
              Question : {question?.no} &nbsp;
              <span
                className={classNames(
                  "px-3 py-1 text-sm font-medium rounded-full",
                  question?.difficulty === QUESTION_DIFFICULTY_TYPES?.EASY
                    ? "bg-green-200"
                    : question?.difficulty === QUESTION_DIFFICULTY_TYPES?.MEDIUM
                    ? "bg-orange-200"
                    : "bg-red-200"
                )}
              >
                {question?.difficulty}
              </span>
            </h5>
            <div className="flex flex-col gap-5">
              <p className="whitespace-pre-wrap">{question?.question}</p>
              {question?.image && (
                <img
                  className="max-w-[600px]"
                  src={question?.image}
                  alt={`MCQ ${question?.type} ${question?.no}`}
                />
              )}
              {question?.restOfQuestion && (
                <p className="whitespace-pre-wrap">{question.restOfQuestion}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {question?.options &&
                question?.options.map((option, index) => {
                  const isCorrect = question.answer?.includes(index + 1); // Check if this option is correct
                  const isUserAnswer = marks.answers[question.no - 1]?.includes(
                    index + 1
                  ); // Check if the user selected this option
                  const className = classNames(
                    "flex p-3 rounded-lg cursor-pointer",
                    {
                      "bg-green-400": isCorrect, // Mark correct answers in green
                      "bg-red-400": !isCorrect && isUserAnswer, // Mark wrong answers in red
                      "bg-purple-100": !isCorrect && !isUserAnswer, // Default styling for unselected incorrect options
                    }
                  );

                  return (
                    <div key={index} className={className}>
                      ({index + 1}) &nbsp; {option}
                    </div>
                  );
                })}
            </div>
            <div className="bg-blue-100 p-5 rounded-lg">
              <p className="font-medium mb-2">Explanation: </p>
              {question?.answerClarification}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkMain;
