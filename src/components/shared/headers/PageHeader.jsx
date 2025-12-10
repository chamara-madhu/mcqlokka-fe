import { ArrowLeft } from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, showBack }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 bg-white border-b">
      <div className="flex items-center gap-3 mb-3">
        {showBack && (
          <ArrowLeft
            size={20}
            color="#667085"
            className="cursor-pointer hover:text-gray-900"
            onClick={() => navigate(-1)}
          />
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
