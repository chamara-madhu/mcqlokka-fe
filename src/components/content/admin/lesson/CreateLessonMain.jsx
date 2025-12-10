import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../shared/fields/FormInput";
import lessonService from "../../../../services/lesson.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_LESSON_MANAGE_PATH } from "../../../../constants/routes";
import PageHeader from "../../../shared/headers/PageHeader";
import subjectService from "../../../../services/subject.service";

const initialState = {
  subjectId: "",
  no: "",
  lesson: "",
};

const CreateLessonMain = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { getAllSubjects } = subjectService();
  const { createLesson, updateLesson, getLessonById } = lessonService();

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

  useEffect(() => {
    const fetchLesson = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const res = await getLessonById(id);
        setForm((prev) => ({
          ...prev,
          subjectId: res.data.subject?._id,
          no: res.data.no,
          lesson: res.data.lesson,
        }));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

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
    let no = "";
    let lesson = "";

    // Validate Exam
    if (!form.subjectId) {
      subjectId = "Exam is required";
    }

    // Validate Medium
    if (!form.no) {
      no = "Lesson number is required";
    }

    // Validate Type
    if (!form.lesson) {
      lesson = "Lesson name is required";
    }

    // Check if any error exists
    if (subjectId || no || lesson) {
      setErrors((prev) => ({
        ...prev,
        subjectId,
        no,
        lesson,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      if (!id) {
        await createLesson(form);
        toast.success("Lesson successfully created");
        handleReset();
      } else {
        await updateLesson(id, form);
        toast.success("Lesson successfully updated");
        navigate(ADMIN_LESSON_MANAGE_PATH);
      }
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
      <PageHeader title={id ? "Edit Lesson" : "Create Lesson"} />

        <form className="flex w-full md:w-[50%] flex-col gap-6">
          <TypeOrSelect
            isClearable
            label="Subject"
            name="subjectId"
            onChange={handleChange}
            options={subjects}
            value={
              subjects.filter(
                (subject) => subject.value === form.subjectId
              )?.[0]?.label
            }
            placeholder="-- Select --"
            error={errors.subjectId}
            showRequiredLabel
          />
          <FormInput
            type="number"
            name="no"
            value={form.no}
            label="Lesson number"
            onChange={handleChange}
            placeholder="Eg. 1"
            isRequired
            error={errors.no}
          />
          <FormInput
            name="lesson"
            label="Lesson"
            value={form.lesson}
            onChange={handleChange}
            placeholder="Eg. Concept of ICT"
            isRequired
            error={errors.lesson}
          />
          <div className="flex gap-2">
            <Button
              label={id ? "Save" : "Submit"}
              isLoading={loading}
              handleBtn={handleCreateLesson}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
    </>
  );
};

export default CreateLessonMain;
