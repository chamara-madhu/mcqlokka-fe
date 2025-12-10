import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import lessonService from "../../../../services/lesson.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";
import subjectService from "../../../../services/subject.service";
import FormTextarea from "../../../shared/fields/FormTextarea";

const initialState = {
  subjectId: "",
  bulk: "",
};

const CreateBulkLessonMain = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllSubjects } = subjectService();
  const { createBulkLesson } = lessonService();

  useEffect(() => {
    const fetchAllSubjects = async () => {
      try {
        const res = await getAllSubjects();
        const mapped = res?.data?.map((subject) => ({
          value: subject._id,
          label: `${subject.name} ${subject.exam} ${subject.medium} (${subject.type})`,
        }));
        setSubjects(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllSubjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const isValid = () => {
    let subjectId = "";
    let bulk = "";

    // Validate Exam
    if (!form.subjectId) {
      subjectId = "Exam is required";
    }

    // Validate Medium
    if (!form.bulk) {
      bulk = "Lesson number is required";
    }

    // Check if any error exists
    if (subjectId || bulk) {
      setErrors((prev) => ({
        ...prev,
        subjectId,
        bulk,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleBulkLesson = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      await createBulkLesson(form);
      toast.success("Lesson successfully created");
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
  };

  return (
    <>
      <PageHeader title="Bulk Lesson" />

      <form className="flex w-full md:w-[50%] flex-col gap-6">
        <TypeOrSelect
          isClearable
          label="Subject"
          name="subjectId"
          onChange={handleChange}
          options={subjects}
          value={
            subjects.filter((subject) => subject.value === form.subjectId)?.[0]
              ?.label
          }
          placeholder="-- Select --"
          error={errors.subjectId}
          showRequiredLabel
        />
        <FormTextarea
          name="bulk"
          value={form.bulk}
          label="Bulk"
          onChange={handleChange}
          placeholder="[{ no: 1, lesson: 'Introduction' }]"
          rows="15"
          isRequired
          error={errors.bulk}
        />
        <div className="flex gap-2">
          <Button
            label="Submit"
            isLoading={loading}
            handleBtn={handleBulkLesson}
          />
          <Button label="Reset" color="secondary" handleBtn={handleReset} />
        </div>
      </form>
    </>
  );
};

export default CreateBulkLessonMain;
