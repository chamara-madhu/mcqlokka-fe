// import { Link } from "react-router-dom";
// import { MCQ_ALL_PATH } from "../../../constants/routes";
import classNames from "classnames";
import { EXAMS, FEES } from "../../../constants/base";

const LessonCard = ({ _id, exam, lesson, fee }) => {
  return (
    // <Link to={`${MCQ_ALL_PATH}/${_id}`}>
      <div className="flex flex-col w-full border border-purple-400 rounded-xl">
        <div
          className={`relative flex justify-center items-center ${
            exam === EXAMS.AL ? "bg-purple-200" : "bg-purple-100"
          } h-32 rounded-t-xl`}
        >
          <h1 className="text-4xl font-normal">{exam}</h1>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{lesson}</h3>
          <p className="text-sm text-purple-800 mb-3">
            Information Communication Technology
          </p>
          <div className="flex justify-between">
            <div
              className={classNames(
                "px-3 py-1 text-sm rounded-lg",
                fee === FEES.FREE ? "bg-green-200" : "bg-red-200"
              )}
            >
              {fee} Paid
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
};

export default LessonCard;
