import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import PageHeader from "../../../shared/headers/PageHeader";
import lessonService from "../../../../services/lesson.service";
import { ADMIN_LESSON_CREATE_PATH } from "../../../../constants/routes";
import { Link } from "react-router-dom";

const ManageLessonMain = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllLessons, deleteLesson } = lessonService();

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await getAllLessons();
        console.log("res", res.data);
        setLessons(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleDeleteLesson = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    
    if (!confirmed) return;

    try {
      await deleteLesson(id);
      toast.success("Lesson successfully deleted!");
      const filter = lessons.filter((paper) => paper._id !== id);
      setLessons(filter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Manage Lesson" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[250px]">Subject</th>
              <th className="w-[100px]">no</th>
              <th className="w-[200px] md:w-auto">Lesson</th>
              <th className="w-[110px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : lessons?.length > 0 ? (
              lessons.map((lesson, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {lesson?.subject?.exam} {lesson?.subject?.name}{" "}
                    {lesson?.subject?.medium}
                  </td>
                  <td>{lesson.no}</td>
                  <td>{lesson.lesson}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700"
                        to={`${ADMIN_LESSON_CREATE_PATH}/${lesson._id}`}
                        target="_blank"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                        onClick={() => handleDeleteLesson(lesson._id)}
                      >
                        <Trash size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageLessonMain;
