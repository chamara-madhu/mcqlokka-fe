import { useNavigate } from "react-router-dom";
import { EXAMS, IS_APPROVED_TYPES, MEDIUMS } from "../../../constants/base";
import config from "../../../config/aws";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";

const SubjectCard = ({ subject }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isComingSoon = subject.isApproved !== IS_APPROVED_TYPES.YES;

  return (
    <div
      onClick={() =>
        !isComingSoon && navigate(`subjects/${subject?._id}`)
      }
      className={`relative flex flex-col w-full border rounded-xl ${
        isComingSoon
          ? "border-gray-300"
          : "border-purple-200 hover:border-purple-400 cursor-pointer"
      }`}
    >
      <div
        className={`relative flex justify-center items-center h-32 rounded-t-xl ${
          isComingSoon
            ? "bg-gray-100"
            : subject?.exam === EXAMS.AL
            ? "bg-purple-200"
            : "bg-purple-100"
        }`}
      >
        <img
          src={`${config.S3_PUBLIC_URL}/${subject?.icon}`}
          alt={subject?.name}
          className={isComingSoon ? "grayscale" : ""}
        />
        <div
          className={`absolute px-3 py-1 text-xs rounded-full right-2 top-2 ${
            isComingSoon ? "bg-white text-gray-600" : "bg-white"
          }`}
        >
          {subject?.exam}
        </div>
      </div>

      <div className="p-4">
        <h3
          className={`text-lg font-semibold ${
            isComingSoon ? "text-gray-500" : "text-black"
          }`}
        >
          {subject?.name}
        </h3>
        <p
          className={`text-sm mb-1 ${
            isComingSoon ? "text-gray-400" : "text-purple-800"
          }`}
        >
          {subject?.medium === MEDIUMS.ENGLISH
            ? "8 papers"
            : "ප්‍රශ්න පත්‍ර 8 යි"}{" "}
          (2017 - 2024)
        </p>
        <p
          className={`text-sm rounded-lg mb-1 ${
            isComingSoon ? "text-gray-400" : ""
          }`}
        >
          {subject?.medium === MEDIUMS.ENGLISH
            ? "English medium"
            : "සිංහල මාධ්‍යය"}
        </p>
        <div className="flex justify-end mt-3">
          <button
            type="button"
            className={`px-3 py-2 text-sm rounded-lg ${
              isComingSoon
                ? "bg-gray-400 text-white"
                : "bg-purple-500 text-white hover:bg-purple-700"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isComingSoon) {
                dispatch(addToCart(subject));
              }
            }}
            disabled={isComingSoon}
          >
            {isComingSoon ? "Coming Soon" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;