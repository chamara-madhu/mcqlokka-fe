import Medal from "../Medal";

const StudentRankCard = ({ no, user, marks, medal }) => {
  return (
    <div className="relative flex items-center gap-4 p-3 bg-white rounded-lg shadow-md">
      {medal && (
        <Medal medal={medal} className="absolute w-12 h-12 -top-2 -right-3" />
      )}
      <div className="flex items-center justify-center w-8 h-8 text-sm text-gray-500 border border-gray-300 rounded-full">
        {no}
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
        <span className="text-lg font-bold text-purple-700">
          {user?.name?.[0]?.toUpperCase() || "?"}
        </span>
      </div>
      <div className="flex w-[70%] flex-col">
        <p className="font-semibold text-gray-800 text-md text-wrap">
          {user?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-500">Marks: {marks || 0}</p>
      </div>
    </div>
  );
};

export default StudentRankCard;
