import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";
import subjectService from "../../../../services/subject.service";
import paperService from "../../../../services/paper.service";
import FormInput from "../../../shared/fields/FormInput";

const initialState = {
  subjectId: "",
  noOfQuestions: "",
  time: "",
  year: "",
};

const CreateBulkPaperMain = () => {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { getAllSubjects } = subjectService();
  const { createBulkPaper } = paperService();

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
    let year = "";
    let noOfQuestions = "";
    let time = "";

    // Validate Exam
    if (!form.subjectId) {
      subjectId = "Subject is required";
    }

    // Validate time
    if (!form.time) {
      time = "Time is required";
    }

    // Validate noOfQuestions
    if (!form.noOfQuestions) {
      noOfQuestions = "No of questions is required";
    }

    // Validate Year
    if (!form.year || form.year?.length !== 9) {
      year = "Valid year range is required";
    }

    // Check if any error exists
    if (subjectId || year || noOfQuestions || time) {
      setErrors((prev) => ({
        ...prev,
        subjectId,
        year,
        noOfQuestions,
        time,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleCreatePaper = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      await createBulkPaper(form);
      toast.success("Bulk papers successfully created");

      handleReset();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
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
      <PageHeader title="Create Bulk Papers" />
      <div>
        <form className="flex w-full md:w-[50%] flex-col gap-6">
          <TypeOrSelect
            isClearable
            label="Subject"
            name="subjectId"
            onChange={handleChange}
            options={subjects}
            value={
              subjects.filter(
                (subject) => subject.value === form.subjectId,
              )?.[0]?.label
            }
            placeholder="-- Select --"
            error={errors.subjectId}
            showRequiredLabel
          />
          <FormInput
            type="number"
            name="noOfQuestions"
            label="No of questions"
            value={form.noOfQuestions}
            onChange={handleChange}
            placeholder="Eg. 50"
            isRequired
            error={errors.noOfQuestions}
          />
          <FormInput
            type="number"
            name="time"
            label="Time"
            value={form.time}
            onChange={handleChange}
            placeholder="Eg. 2"
            isRequired
            error={errors.time}
          />
          <FormInput
            name="year"
            label="Year range"
            value={form.year}
            onChange={handleChange}
            isRequired
            error={errors.year}
            info="Eg. 2017-2024"
          />

          <div className="flex gap-2">
            <Button
              label="Submit"
              isLoading={loading}
              handleBtn={handleCreatePaper}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBulkPaperMain;
