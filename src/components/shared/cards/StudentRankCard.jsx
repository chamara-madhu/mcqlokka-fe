import Medal from "../Medal";

const StudentRankCard = ({ no, user, marks, medal }) => {
  return (
    <div className="relative flex items-center gap-4 p-3 bg-white rounded-lg border border-purple-200">
      <div className="flex items-center justify-center w-8 h-8 text-sm text-gray-500 border border-gray-300 rounded-full">
        {no}
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
        {user?.name?.[0]?.toUpperCase() || "?"}
      </div>
      <div className="flex w-[70%] flex-col">
        <p className="font-semibold text-gray-800 text-md text-wrap">
          {user?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-500">Marks: {marks || 0}</p>
      </div>
      {medal && <Medal medal={medal} />}
    </div>
  );
};

export default StudentRankCard;
