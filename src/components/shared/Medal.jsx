const Medal = ({ medal }) => {
  const getMedalInfo = (medal) => {
    if (medal === 1)
      return { name: "Gold", color: "text-yellow-600", icon: "🥇" };
    if (medal === 2)
      return { name: "Silver", color: "text-gray-500", icon: "🥈" };
    if (medal === 3)
      return { name: "Bronze", color: "text-orange-700", icon: "🥉" };
    return null;
  };

  const medalInfo = getMedalInfo(medal);

  return (
    medalInfo && (
      <div className="text-center">
        <div className="text-3xl mb-1">{medalInfo.icon}</div>
        <p className={`text-xs font-semibold ${medalInfo.color}`}>
          {medalInfo.name}
        </p>
      </div>
    )
  );
};

export default Medal;
