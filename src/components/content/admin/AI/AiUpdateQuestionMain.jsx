import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import questionService from "../../../../services/question.service";
import paperService from "../../../../services/paper.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";

const initialState = {
  paperId: "",
};

const AiUpdateQuestionMain = () => {
  const [papers, setPapers] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { getAllPapers } = paperService();
  const { aiUpdateQuestion } = questionService();

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

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const res = await getAllPapers();
        const mapped = res?.data?.map((paper) => ({
          value: paper._id,
          label: `${paper?.subject?.exam} ${paper?.subject?.name} - ${paper?.subject?.medium} ${paper?.year} (${paper?.subject?.type})`,
        }));
        setPapers(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = () => {
    let paperId = "";

    if (!form.paperId) {
      paperId = "Paper name is required";
    }

    if (paperId) {
      setErrors((prev) => ({
        ...prev,
        paperId,
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
      await aiUpdateQuestion(form);
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
  };

  return (
    <>
      <PageHeader title={"AI Update Paper Questions"} />

      <div>
        <form className="flex w-full md:w-[50%] flex-col gap-6">
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

          <div className="flex gap-2">
            <Button
              label="Submit"
              isLoading={loading}
              loadingLabel="Updating..."
              handleBtn={handleCreateQuestion}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AiUpdateQuestionMain;
