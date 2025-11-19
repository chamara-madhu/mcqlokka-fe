import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import paperService from "../../../../services/paper.service";
import PageHeader from "../../../shared/headers/PageHeader";
import { useNavigate } from "react-router-dom";
import { ADMIN_PAPER_CREATE_PATH } from "../../../../constants/routes";

const ManagePaperMain = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllPapers, deletePaper, updateApprovalStatus } = paperService();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await getAllPapers();
        setPapers(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleDeletePaper = async (id) => {
    try {
      await deletePaper(id);
      toast.success("Paper successfully deleted!");
      const filter = papers.filter((paper) => paper._id !== id);
      setPapers(filter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApproval = async (paper) => {
    const newStatus = paper.isApproved === "Yes" ? "No" : "Yes";

    // Optional: update UI immediately (optimistic update)
    const updatedPapers = papers.map((q) =>
      q._id === paper._id ? { ...q, isApproved: newStatus } : q
    );
    setPapers(updatedPapers);

    try {
      await updateApprovalStatus(paper._id, newStatus);
      // Optional success toast here
    } catch (err) {
      console.error(err);
      // Revert UI if API fails
      setPapers(papers);
    }
  };

  return (
    <>
      <PageHeader title="Manage Paper" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[100px]">Subject</th>
              <th className="w-[100px]">Exam</th>
              <th className="w-[100px]">Medium</th>
              <th className="w-[100px]">type</th>
              <th className="w-[100px]">Year</th>
              <th className="w-[100px]">No of Questions</th>
              <th className="w-[100px]">Time</th>
              <th className="w-[200px]">Long name</th>
              <th className="w-[100px]">Fee</th>
              <th>Statistics</th>
              <th className="w-[110px]">Is Approved</th>
              <th className="w-[110px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : papers.length > 0 ? (
              papers.map((paper, index) => (
                <tr key={index} className="text-sm">
                  <td>{paper?.subject?.name}</td>
                  <td>{paper?.subject?.exam}</td>
                  <td>{paper?.subject?.medium}</td>
                  <td>{paper?.subject?.type}</td>
                  <td>{paper.year}</td>
                  <td>{paper.noOfQuestions}</td>
                  <td>{paper.time}</td>
                  <td>{paper?.longName}</td>
                  <td>{paper.fee}</td>
                  <td>
                    {paper?.stats?.noOfStuds && (
                      <p>{`No of students: ${paper?.stats?.noOfStuds}, A: ${paper?.stats?.a}, B: ${paper?.stats?.b}, C: ${paper?.stats?.c}, S: ${paper?.stats?.s}, F: ${paper?.stats?.f}`}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paper.isApproved === "Yes"}
                          onChange={() => handleToggleApproval(paper)}
                          className="sr-only peer"
                        />
                        <div
                          className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
        peer-checked:after:translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
        peer-checked:bg-green-500"
                        ></div>
                      </label>

                      <span
                        className={`text-xs font-medium ${
                          paper.isApproved === "Yes"
                            ? "text-green-700"
                            : "text-orange-700"
                        }`}
                      >
                        {paper.isApproved === "Yes" ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700"
                        onClick={() =>
                          navigate(`${ADMIN_PAPER_CREATE_PATH}/${paper._id}`)
                        }
                      >
                        <Edit2 size={16} />
                      </div>
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                        onClick={() => handleDeletePaper(paper._id)}
                      >
                        <Trash size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center">
                  No papers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagePaperMain;
