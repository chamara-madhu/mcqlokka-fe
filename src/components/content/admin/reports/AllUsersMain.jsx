import { useEffect, useState } from "react";
import PageHeader from "../../../shared/headers/PageHeader";
import userService from "../../../../services/user.service";
import { USER_ROLES } from "../../../../constants/base";

const AllUsersMain = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllUsers } = userService();

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        const res = await getAllUsers();
        setUsers(res.data);
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

  return (
    <>
      <PageHeader title="All Users" />

      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="">Name</th>
              <th className="w-[300px]">email</th>
              <th className="w-[100px]">role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : users?.length > 0 ? (
              users.map((lesson, index) => (
                <tr key={index} className="text-sm">
                  <td>{lesson.name}</td>
                  <td>{lesson.email}</td>
                  <td>
                    {lesson.role === USER_ROLES.ADMIN ? "Admin" : "Student"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsersMain;
