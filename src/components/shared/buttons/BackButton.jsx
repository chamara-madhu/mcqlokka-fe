import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ page }) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition mb-4"
      >
        <ArrowLeft size={16} />
        Back to {page}
      </button>
    </div>
  );
};

export default BackButton;
