import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const GenerateModelPaperMain = () => {
  const [papers, setPapers] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getAllPapers } = paperService();
  const { generateModelPaper } = questionService();

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
          label: `${paper.exam} ${paper.medium} ${paper.year} (${paper.type})`,
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

  const handleGenerateModelPaper = async (e) => {
    e.preventDefault();

    if (!isValid()) return;
    setLoading(true);

    try {
      await generateModelPaper(form);
      toast.success("Model paper successfully generated.");
      handleReset();
    } catch (error) {
      // toast.error(
      //   error?.response?.data?.message ||
      //     "An unexpected error occurred. Please try again."
      // );
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
      <PageHeader title={"Model Paper Generation"} />

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

          <div className="flex gap-2">
            <Button
              label="Generate"
              isLoading={loading}
              loadingLabel="Generating..."
              handleBtn={handleGenerateModelPaper}
            />
            <Button label="Reset" color="secondary"  handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default GenerateModelPaperMain;
