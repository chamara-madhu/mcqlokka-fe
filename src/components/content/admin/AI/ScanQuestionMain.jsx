import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import {
  QUESTION_TYPES_OPTIONS,
  QUESTION_DIFFICULTY_TYPES_OPTIONS,
} from "../../../../constants/base";
import FormTextarea from "../../../shared/fields/FormTextarea";
import FormInput from "../../../shared/fields/FormInput";
import questionService from "../../../../services/question.service";
import paperService from "../../../../services/paper.service";
import lessonService from "../../../../services/lesson.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";
import { ADMIN_QUESTION_MANAGE_PATH } from "../../../../constants/routes";
import PageHeader from "../../../shared/headers/PageHeader";

const initialState = {
  paperId: "",
};

const ScanQuestionMain = () => {
  const [papers, setPapers] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false); // For drag-and-drop hover effect

  const navigate = useNavigate();

  console.log("file", file)

  const { getAllPapers } = paperService();
  const { scanQuestion } = questionService();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const res = await getAllPapers();
        const mapped = res?.data?.map((paper) => ({
          value: paper._id,
          label: `${paper?.subject?.exam} ${paper?.subject?.medium} ${paper?.year} (${paper?.subject?.type})`,
        }));
        setPapers(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const fetchLessons = async () => {
  //     try {
  //       if (!form.paperId) return;

  //       const res = await getAllLessonsByPaperId(form.paperId);
  //       const mappedLessons = res?.data?.map((lesson) => ({
  //         value: lesson._id,
  //         label: `${lesson.no}. ${lesson.lesson}`,
  //       }));
  //       // setLessons(mappedLessons);
  //     } catch (error) {
  //       console.error("Error fetching lessons:", error);
  //     }
  //   };

  //   fetchLessons();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form.paperId]);

  const isValid = () => {
    let paperId = "";
    let fileErr = "";

    if (!form.paperId) {
      paperId = "Paper name is required";
    }

    if (!file) {
      fileErr = "A file is required";
    }

    if (paperId || fileErr) {
      setErrors((prev) => ({
        ...prev,
        paperId,
        file: fileErr,
      }));
      return false;
    }

    return true;
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    if (!isValid()) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("paperId", form.paperId);
      formData.append("file", file);

      //   const formData = new FormData();
      // formData.append('file', file);

      // try {
      // 	const result = await businessCardScan(formData);


        await scanQuestion(formData);
        toast.success("Question successfully created");
        handleReset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors(initialState);
    setFile(null);
  };

  return (
    <>
      <PageHeader title={"Extract Paper Questions"} />

      <div>
        <form className="flex w-[50%] flex-col gap-6">
          <TypeOrSelect
            isClearable
            label="Paper"
            name="paperId"
            onChange={handleChange}
            options={papers}
            value={
              papers.filter((paper) => paper.value === form.paperId)?.[0]?.label
            }
            placeholder="-- Select --"
            error={errors.paperId}
            showRequiredLabel
          />

          {/* Enhanced File Upload UI */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload File *
            </label>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <FeatherIcon
                icon="upload-cloud"
                className="w-8 h-8 text-gray-400"
              />
              <p className="mt-2 text-sm text-gray-600">
                {file
                  ? file.name
                  : "Drag and drop a file here or click to upload"}
              </p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 mt-4 text-sm font-medium text-purple-600 border border-purple-600 rounded-md cursor-pointer hover:bg-purple-100"
              >
                Choose File
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Supported formats: PNG, JPEG, PDF
              </p>
            </div>
            {errors.file && (
              <span className="text-sm text-red-500">{errors.file}</span>
            )}
            {/* Image Preview (Optional) */}
            {file && file.type.startsWith("image/") && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="max-w-xs rounded-md shadow-sm"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              label="Submit"
              isLoading={loading}
              loadingLabel="Extracting..."
              handleBtn={handleCreateQuestion}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ScanQuestionMain;
