import { Link } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";
import classNames from "classnames";
import { EXAMS, FEES } from "../../../constants/base";
import { Lock, Unlock } from "feather-icons-react";

const PaperCard = ({ _id, subject, fee, year, hasPurchased }) => {
  return (
    <Link to={`${MCQ_ALL_PATH}/${_id}`}>
      <div
        className={`relative flex flex-col w-full border rounded-xl ${
          fee === FEES.FREE
            ? "border-green-200 hover:border-green-400"
            : "border-purple-200 hover:border-purple-400"
        }`}
      >
        <div
          className={`flex flex-col justify-center items-center ${
            fee === FEES.FREE ? "bg-green-200" : "bg-purple-100"
          } h-32 rounded-t-xl`}
        >
          {fee === FEES.FREE || hasPurchased ? (
            <Unlock className="text-green-700" size={30} />
          ) : (
            <Lock className="text-purple-700" size={30} />
          )}
          <p className="text-sm text-gray-600">
            {fee === FEES.FREE ? "Free" : hasPurchased ? "Unlock" : "Lock"}
          </p>

          <div className="absolute px-3 py-1 text-xs rounded-full bg-white right-2 top-2">
            {subject?.type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{year}</h3>
          <p className="text-sm text-purple-800 mb-3">{subject?.name}</p>
          <div className="flex justify-end items-center">
            <div
              className={classNames(
                "px-3 py-2 text-sm rounded-lg",
                fee === FEES.FREE || hasPurchased
                  ? "bg-green-200 hover:bg-green-300"
                  : "bg-purple-200 hover:bg-purple-300"
              )}
            >
              {fee === FEES.FREE || hasPurchased ? "Try now" : "Buy now"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PaperCard;
