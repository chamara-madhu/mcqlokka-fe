import { useEffect, useState } from "react";
import PageHeader from "../../../shared/headers/PageHeader";
import markService from "../../../../services/mark.service";
import moment from "moment";
import Medal from "../../../shared/Medal";
import Button from "../../../shared/buttons/Button";
import { MCQ_EXAM_MARK_PATH } from "../../../../constants/routes";
import { formatTimeSpent } from "../../../../utils/general";

const MyResultsMain = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllMyResults } = markService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllMyResults();
        setResults(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="My Results" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[200px]">Timestamp</th>
              <th className="">Exam</th>
              <th className="w-[100px]">Fee</th>
              <th className="w-[100px]">Marks</th>
              <th className="w-[100px]">Time Spent</th>
              <th className="w-[100px]">Medal</th>
              <th className="w-[145px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : results.length > 0 ? (
              results.map((mark, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {moment
                      .utc(mark.createdAt)
                      .local()
                      .format("YYYY-MM-DD HH:MM A")}
                  </td>
                  <td>{mark?.paper?.longName}</td>
                  <td>{mark?.paper?.fee}</td>
                  <td>{mark?.marks?.toFixed(2)}</td>
                  <td>{formatTimeSpent(mark?.timeSpent)}</td>
                  <td>
                    {mark?.medal ? (
                      <Medal medal={mark.medal} className="w-12 h-12" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <Button
                      label="Download"
                      className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                      size="small"
                      handleBtn={() =>
                        window.open(
                          `${MCQ_EXAM_MARK_PATH.replace("/:markId", "")}/${
                            mark?._id
                          }`,
                          "_blank" // Open in a new tab
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyResultsMain;
