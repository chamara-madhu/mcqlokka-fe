import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../shared/fields/FormInput";
import {
  EXAM_OPTIONS,
  MEDIUM_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../constants/base";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_SUBJECT_MANAGE_PATH } from "../../../../constants/routes";
import ImageUpload from "../../../shared/fields/ImageUpload";
import subjectService from "../../../../services/subject.service";

const initialState = {
  name: "",
  forSearch: "",
  exam: "",
  medium: "",
  type: "",
  icon: "",
};

const initialFiles = {
  icon: null,
  iconErr: "",
};

const CreateSubjectMain = () => {
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { createSubject, updateSubject, getSubjectById } = subjectService();

  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const res = await getSubjectById(id);
        setForm((prev) => ({
          ...prev,
          name: res.data.name,
          forSearch: res.data.forSearch,
          exam: res.data.exam,
          medium: res.data.medium,
          type: res.data.type,
        }));
        setFiles((prev) => ({
          ...prev,
          icon: res.data.icon,
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

    fetchSubject();
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

  const handleFile = (name, value) => {
    setFiles((file) => ({
      ...file,
      [name]: value,
      [name + "Err"]: "",
    }));
  };

  const removeImage = (name) => {
    setFiles((file) => ({
      ...file,
      [name]: null,
      [name + "Err"]: "",
    }));
  };

  const isValid = () => {
    let name = "";
    let forSearch = "";
    let exam = "";
    let medium = "";
    let type = "";
    let icon = "";

    // Validate name
    if (!form.name) {
      name = "Subject is required";
    }

    // Validate forSearch
    if (!form.forSearch) {
      forSearch = "Search name is required";
    }

    // Validate Exam
    if (!form.exam) {
      exam = "Exam is required";
    }

    // Validate Medium
    if (!form.medium) {
      medium = "Medium is required";
    }

    // Validate Type
    if (!form.type) {
      type = "Type is required";
    }

    // Validate icon
    if (!form.icon && !files.icon) {
      icon = "Icon is required";
    }

    // Check if any error exists
    if (name || forSearch || exam || medium || type || icon) {
      setErrors((prev) => ({
        ...prev,
        name,
        forSearch,
        exam,
        medium,
        type,
        icon,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("forSearch", form.forSearch);
    formData.set("exam", form.exam);
    formData.set("medium", form.medium);
    formData.set("type", form.type);
    if (form?.icon) {
      formData.set("icon", form.icon);
    }

    if (files?.icon) {
      formData.append("icon", files.icon);
    }

    try {
      if (!id) {
        await createSubject(formData);
        toast.success("Subject successfully created");
      } else {
        await updateSubject(id, formData);
        toast.success("Subject successfully updated");
        navigate(ADMIN_SUBJECT_MANAGE_PATH);
      }

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
    setFiles(initialFiles);
  };

  return (
    <>
      <PageHeader title={id ? "Edit Subject" : "Create Subject"} />
      <div>
        <form className="flex w-full md:w-[50%] flex-col gap-6">
          <FormInput
            name="name"
            label="Subject name"
            value={form.name}
            onChange={handleChange}
            placeholder="Eg. Accounting"
            isRequired
            error={errors.name}
          />
          <FormInput
            name="forSearch"
            label="Search name"
            value={form.forSearch}
            onChange={handleChange}
            placeholder="Eg. Accounting"
            isRequired
            error={errors.forSearch}
          />
          <TypeOrSelect
            isClearable
            label="Exam"
            name="exam"
            onChange={handleChange}
            options={EXAM_OPTIONS}
            value={form.exam}
            placeholder="Eg. A/L"
            error={errors.exam}
            showRequiredLabel
          />
          <TypeOrSelect
            isClearable
            label="Medium"
            name="medium"
            onChange={handleChange}
            options={MEDIUM_OPTIONS}
            value={form.medium}
            placeholder="Eg. English"
            error={errors.medium}
            showRequiredLabel
          />
          <TypeOrSelect
            isClearable
            label="Type"
            name="type"
            onChange={handleChange}
            options={TYPE_OPTIONS}
            value={form.type}
            placeholder="Eg. Past"
            error={errors.type}
            showRequiredLabel
            />
          <FormInput
            name="icon"
            label="Icon URL"
            value={form.icon}
            onChange={handleChange}
            placeholder="Eg. subjects/AL/icons/Biology"
            error={errors.icon}
          />
          <p className="text-center text-gray-500">or</p>
          <ImageUpload
            label="Icon URL"
            name="icon"
            value={files.icon}
            existingValue={
              typeof files?.icon === "string" && files?.icon?.includes("icons")
                ? files.icon
                : ""
            }
            handleFile={handleFile}
            error={errors.icon}
            removeImage={removeImage}
          />
          <div className="flex gap-2">
            <Button
              label={id ? "Save" : "Submit"}
              isLoading={loading}
              handleBtn={handleCreateSubject}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSubjectMain;
