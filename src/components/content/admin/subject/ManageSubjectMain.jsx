import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import subjectService from "../../../../services/subject.service";
import PageHeader from "../../../shared/headers/PageHeader";
import { useNavigate } from "react-router-dom";
import { ADMIN_SUBJECT_CREATE_PATH } from "../../../../constants/routes";
import config from "../../../../config/aws";

const ManageSubjectMain = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllSubjects, deleteSubject, updateApprovalStatus } =
    subjectService();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await getAllSubjects();
        setSubjects(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleDeleteSubject = async (id) => {
    try {
      await deleteSubject(id);
      toast.success("Subject successfully deleted!");
      const filter = subjects.filter((subject) => subject._id !== id);
      setSubjects(filter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleApproval = async (subject) => {
    const newStatus = subject.isApproved === "Yes" ? "No" : "Yes";

    // Optional: update UI immediately (optimistic update)
    const updatedSubjects = subjects.map((q) =>
      q._id === subject._id ? { ...q, isApproved: newStatus } : q
    );
    setSubjects(updatedSubjects);

    try {
      await updateApprovalStatus(subject._id, newStatus);
      // Optional success toast here
    } catch (err) {
      console.error(err);
      // Revert UI if API fails
      setSubjects(subjects);
    }
  };

  return (
    <>
      <PageHeader title="Manage Subject" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[70px]">Icon</th>
              <th className="">Name</th>
              <th className="w-[100px]">Exam</th>
              <th className="w-[100px]">Type</th>
              <th className="w-[100px]">Medium</th>
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
            ) : subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {subject.icon && (
                      <img
                        src={`${config.S3_PUBLIC_URL}/${subject.icon}`}
                        alt="Question"
                        className="rounded"
                      />
                    )}
                  </td>
                  <td>{subject.name}</td>
                  <td>{subject.exam}</td>
                  <td>{subject.type}</td>
                  <td>{subject.medium}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={subject.isApproved === "Yes"}
                          onChange={() => handleToggleApproval(subject)}
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
                          subject.isApproved === "Yes"
                            ? "text-green-700"
                            : "text-orange-700"
                        }`}
                      >
                        {subject.isApproved === "Yes" ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700"
                        onClick={() =>
                          navigate(
                            `${ADMIN_SUBJECT_CREATE_PATH}/${subject._id}`
                          )
                        }
                      >
                        <Edit2 size={16} />
                      </div>
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                        onClick={() => handleDeleteSubject(subject._id)}
                      >
                        <Trash size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageSubjectMain;
