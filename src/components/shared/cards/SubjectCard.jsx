import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { EXAMS, MEDIUMS } from "../../../constants/base";
import config from "../../../config/aws";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";

const SubjectCard = ({ subject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
      <div onClick={() => navigate(`subjects/${subject?._id}`)} className="relative flex flex-col w-full border border-purple-200 rounded-xl hover:border-purple-400 cursor-pointer">
        <div
          className={`relative flex justify-center items-center ${
            subject?.exam === EXAMS.AL ? "bg-purple-200" : "bg-purple-100"
          } h-32 rounded-t-xl`}
        >
          <img
            src={`${config.S3_PUBLIC_URL}/${subject?.icon}`}
            alt={subject?.name}
          />
          <div className="absolute px-3 py-1 text-xs rounded-full bg-white right-2 top-2">
            {subject?.exam}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-black text-lg font-semibold">{subject?.name}</h3>
          <p className="text-sm text-purple-800 mb-1">8 papers (2017 - 2025)</p>
          <p className={classNames(
                "text-sm rounded-lg mb-1",
                subject?.medium === MEDIUMS.ENGLISH
                  ? "text-blue-600"
                  : "text-orange-600"
              )}>{subject?.medium}</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-3 py-2 text-sm rounded-lg text-white bg-purple-500 hover:bg-purple-700"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(subject));
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default SubjectCard;
