import { useEffect, useState } from "react";
import subjectService from "../../../services/subject.service";
import CheckedIcon from "../../../assets/icons/check.svg";
import UnCheckedIcon from "../../../assets/icons/un-check.svg";
import {
  EXAM_OPTIONS,
  MEDIUM_OPTIONS,
  SUBJECT_OPTIONS,
} from "../../../constants/base";
import SubjectCard from "../../shared/cards/SubjectCard";
import PageLoader from "../../shared/loading/PageLoader";
import { Filter, X, Search } from "feather-icons-react";
import HelmetComp from "../../shared/seo/HelmetComp";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  const getActiveFilterCount = () => {
    return (
      filters.subject.length +
      filters.exam.length +
      filters.medium.length +
      filters.type.length
    );
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
      filters.subject.length === 0 ||
      filters.subject.includes(subject?.forSearch);
    const matchesExam =
      filters.exam.length === 0 || filters.exam.includes(subject.exam);
    const matchesMedium =
      filters.medium.length === 0 || filters.medium.includes(subject.medium);
    const matchesType =
      filters.type.length === 0 || filters.type.includes(subject.type);
    const matchesSearch =
      searchText === "" ||
      subject?.forSearch.toLowerCase().includes(searchText.toLowerCase());

    return (
      matchesSubject &&
      matchesExam &&
      matchesMedium &&
      matchesType &&
      matchesSearch
    );
  });

  // Filter Section Component
  const FilterSection = ({ isMobile = false }) => (
    <div className={`flex flex-col gap-5 ${isMobile ? "w-full" : "w-[280px]"}`}>
      <div className="flex items-center justify-between w-full h-fit">
        <p className="text-lg font-semibold">Filters</p>
        <div className="flex items-center gap-3">
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-purple-600 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
          <span
            className="text-sm text-gray-400 cursor-pointer hover:text-purple-700"
            onClick={handleResetFilter}
          >
            Reset
          </span>
          {isMobile && (
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-1 rounded-lg hover:bg-purple-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Subjects</p>
        <div className="flex flex-col overflow-hidden rounded-md">
          {SUBJECT_OPTIONS.map((subject) => (
            <label
              key={subject.value}
              className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <input
                type="checkbox"
                name="subject"
                className="hidden peer"
                value={subject.value}
                checked={filters.subject.includes(subject.value)}
                onChange={() => handleCheckboxChange("subject", subject.value)}
              />
              <img
                src={
                  filters.subject.includes(subject.value)
                    ? CheckedIcon
                    : UnCheckedIcon
                }
                alt="check icon"
                className="w-5 h-5"
                loading="lazy"
              />
              <span className="text-sm">{subject.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Exam Type</p>
        <div className="flex flex-col overflow-hidden rounded-md">
          {EXAM_OPTIONS.map((exam) => (
            <label
              key={exam.value}
              className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
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
                className="w-5 h-5"
                loading="lazy"
              />
              <span className="text-sm">G.C.E {exam.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Medium</p>
        <div className="flex flex-col overflow-hidden rounded-md">
          {MEDIUM_OPTIONS.map((medium) => (
            <label
              key={medium.value}
              className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
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
                className="w-5 h-5"
                loading="lazy"
              />
              <span className="text-sm">{medium.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col w-full gap-5 px-4 sm:px-6 lg:px-8 lg:flex-row lg:gap-7">
      <HelmetComp
        title="MCQ Lokka | Practice O/L & A/L MCQs for All Subjects in Sri Lanka"
        description="Explore all O/L & A/L subjects on MCQ Lokka. Search, filter, and practice lesson-wise MCQs, past papers, and exam questions with detailed explanations anytime, anywhere."
      />

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block">
        <FilterSection />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-purple-600 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Filter Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-5">
              <FilterSection isMobile={true} />
            </div>

            {/* Apply Button */}
            <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-4 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full lg:w-auto">
        {/* Search and Results Count */}
        <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-sm text-purple-500 font-medium">
            {filteredPapers?.length || 0} Subject
            {filteredPapers?.length !== 1 ? "s" : ""}
          </h1>

          {/* Search Bar */}
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[300px] md:w-[400px] pl-11 pr-5 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {searchText && (
              <button
                onClick={() => setSearchText("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Subject Cards Grid */}
        {filteredPapers?.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredPapers.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No subjects found
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              {searchText
                ? `No subjects match "${searchText}". Try adjusting your search or filters.`
                : "No subjects match your current filters. Try adjusting your selection."}
            </p>
            {(searchText || getActiveFilterCount() > 0) && (
              <button
                onClick={() => {
                  setSearchText("");
                  handleResetFilter();
                }}
                className="px-6 py-2 text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSubjectsMain;
