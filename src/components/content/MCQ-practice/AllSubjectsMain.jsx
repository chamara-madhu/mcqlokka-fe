import { useEffect, useState } from "react";
import subjectService from "../../../services/subject.service";
import CheckedIcon from "../../../assets/icons/check.svg";
import UnCheckedIcon from "../../../assets/icons/un-check.svg";
import {
  MEDIUM_OPTIONS,
  SUBJECT_OPTIONS,
} from "../../../constants/base";
import SubjectCard from "../../shared/cards/SubjectCard";
import PageLoader from "../../shared/loading/PageLoader";

const initialFilters = {
  subject: [],
  exam: [],
  medium: [],
  type: [],
};

const AllSubjectsMain = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [subjects, setPapers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [preLoading, setPreLoading] = useState(true);
  const { getAllSubjects } = subjectService();

  // Handle checkbox change for multiple selection
  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        // Remove value if already selected (uncheck)
        const index = updatedFilter.indexOf(value);
        updatedFilter.splice(index, 1);
      } else {
        // Add value if not selected (check)
        updatedFilter.push(value);
      }
      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
  };

  const handleResetFilter = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    const fetch = async () => {
      setPreLoading(true);
      const res = await getAllSubjects({ isApproved: "Yes" });
      setPapers(res?.data || []);

      setPreLoading(false);
    };

    fetch();
  }, []);

  if (preLoading) {
    return <PageLoader />;
  }

  // Apply filters
  const filteredPapers = subjects.filter((subject) => {
    const matchesSubject =
      filters.subject.length === 0 || filters.subject.includes(subject.name);
    const matchesExam =
      filters.exam.length === 0 || filters.exam.includes(subject.exam);
    const matchesMedium =
      filters.medium.length === 0 || filters.medium.includes(subject.medium);
    const matchesType =
      filters.type.length === 0 || filters.type.includes(subject.type);
    const matchesSearch =
      searchText === "" ||
      subject.name.toLowerCase().includes(searchText.toLowerCase()); // Search by name

    return (
      matchesSubject &&
      matchesExam &&
      matchesMedium &&
      matchesType &&
      matchesSearch
    );
  });

  return (
    <div className="flex w-full gap-7">
      <div className="flex flex-col gap-5 w-[280px]">
        <div className="flex items-center justify-between w-full h-fit">
          <p className="text-lg font-semibold">Filters</p>
          <span
            className="text-sm text-gray-400 cursor-pointer hover:text-purple-700"
            onClick={handleResetFilter}
          >
            Reset
          </span>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Subjects</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {SUBJECT_OPTIONS.map((subject) => (
              <label
                key={subject.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="subject"
                  className="hidden peer"
                  value={subject.value}
                  checked={filters.subject.includes(subject.value)}
                  onChange={() =>
                    handleCheckboxChange("subject", subject.value)
                  }
                />
                <img
                  src={
                    filters.subject.includes(subject.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{subject.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* <div>
          <p className="mb-2 text-sm font-semibold">Exam Type</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {EXAM_OPTIONS.map((exam) => (
              <label
                key={exam.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="exam-type"
                  className="hidden peer"
                  value={exam.value}
                  checked={filters.exam.includes(exam.value)}
                  onChange={() => handleCheckboxChange("exam", exam.value)}
                />
                <img
                  src={
                    filters.exam.includes(exam.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">G.C.E {exam.label}</span>
              </label>
            ))}
          </div>
        </div> */}
        <div>
          <p className="mb-2 text-sm font-semibold">Medium</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {MEDIUM_OPTIONS.map((medium) => (
              <label
                key={medium.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="medium-type"
                  className="hidden peer"
                  value={medium.value}
                  checked={filters.medium.includes(medium.value)}
                  onChange={() => handleCheckboxChange("medium", medium.value)}
                />
                <img
                  src={
                    filters.medium.includes(medium.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{medium.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* <div>
          <p className="mb-2 text-sm font-semibold">Fees</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {FEE_OPTIONS.map((fee) => (
              <label
                key={fee.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="fee-type"
                  className="hidden peer"
                  value={fee.value}
                  checked={filters.fee.includes(fee.value)}
                  onChange={() => handleCheckboxChange("fee", fee.value)}
                />
                <img
                  src={
                    filters.fee.includes(fee.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{fee.label}</span>
              </label>
            ))}
          </div>
        </div> */}
        {/* <div>
          <p className="mb-2 text-sm font-semibold">Type</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {TYPE_OPTIONS.map((type) => (
              <label
                key={type.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="type"
                  className="hidden peer"
                  value={type.value}
                  checked={filters.type.includes(type.value)}
                  onChange={() => handleCheckboxChange("type", type.value)}
                />
                <img
                  src={
                    filters.type.includes(type.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div> */}
      </div>

      <div className="flex flex-col" style={{ width: "calc(100% - 280px)" }}>
        <div className="flex items-end justify-between">
          <span className="text-sm text-gray-500">
            {filteredPapers?.length || 0} Subjects
          </span>
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-5 py-2 border border-gray-300 w-[400px] rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          {/* <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Sort by (year):
            </span>
            <div
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                sortOrder === "desc"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 hover:bg-purple-500"
              }`}
              onClick={handleSortOrderChange}
            >
              High to Low
            </div>
            <div
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                sortOrder === "asc"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 hover:bg-purple-500"
              }`}
              onClick={handleSortOrderChange}
            >
              Low to High
            </div>
          </div> */}
        </div>
        <div className="grid w-full grid-cols-1 gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPapers?.length > 0 &&
            filteredPapers?.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllSubjectsMain;
