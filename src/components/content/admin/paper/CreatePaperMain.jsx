import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../shared/fields/FormInput";
import { FEE_OPTIONS } from "../../../../constants/base";
import paperService from "../../../../services/paper.service";
import subjectService from "../../../../services/subject.service";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_PAPER_MANAGE_PATH } from "../../../../constants/routes";
import ImageUpload from "../../../shared/fields/ImageUpload";

const initialState = {
  subjectId: "",
  fee: "",
  year: "",
  noOfQuestions: "",
  time: "",
  longName: "",
  stats: {
    noOfStuds: "",
    a: "",
    b: "",
    c: "",
    s: "",
    f: "",
  },
};

const initialFiles = {
  part1StructuredQuestion: null,
  part1StructuredMarkingScheme: null,
  part2Question: null,
  part2MarkingScheme: null,

};

const CreatePaperMain = () => {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(initialState);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { getAllSubjects } = subjectService();
  const { createPaper, updatePaper, getPaperById } = paperService();

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
    const fetchPaper = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const res = await getPaperById(id);
        setForm((prev) => ({
          ...prev,
          subjectId: res.data.subject?._id,
          fee: res.data.fee,
          year: res.data.year,
          noOfQuestions: res.data.noOfQuestions,
          time: res.data.time,
          longName: res.data.longName,
          stats: {
            noOfStuds: res.data.stats.noOfStuds,
            a: res.data.stats.a,
            b: res.data.stats.b,
            c: res.data.stats.c,
            s: res.data.stats.s,
            f: res.data.stats.f,
          },
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

    fetchPaper();
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

  const handleStats = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      stats: {
        ...prevForm.stats,
        [name]: value,
      },
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
    let subjectId = "";
    let fee = "";
    let year = "";
    let noOfQuestions = "";
    let time = "";
    let longName = "";

    // Validate Exam
    if (!form.subjectId) {
      subjectId = "Subject is required";
    }

    // Validate Fee
    if (!form.fee) {
      fee = "Fee is required";
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
    if (
      !form.year ||
      isNaN(form.year) ||
      form.year < 2010 ||
      form.year > new Date().getFullYear()
    ) {
      year = "Valid year is required";
    }

    // Validate Long name
    if (!form.longName || form.longName.trim() === "") {
      longName = "Long name is required";
    }

    // Check if any error exists
    if (subjectId || fee || year || noOfQuestions || time || longName) {
      setErrors((prev) => ({
        ...prev,
        subjectId,
        exam,
        medium,
        type,
        fee,
        year,
        noOfQuestions,
        time,
        longName,
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

    const formData = new FormData();
    formData.set("subjectId", form.subjectId);
    formData.set("fee", form.fee);
    formData.set("year", form.year);
    formData.set("noOfQuestions", form.noOfQuestions);
    formData.set("time", form.time);
    formData.set("longName", form.longName);
    formData.set("stats", JSON.stringify(form.stats));

    if (files?.part1StructuredQuestion) {
      formData.append("part1StructuredQuestion", files.part1StructuredQuestion);
    }

    if (files?.part1StructuredMarkingScheme) {
      formData.append("part1StructuredMarkingScheme", files.part1StructuredMarkingScheme);
    }

    if (files?.part2Question) {
      formData.append("part2Question", files.part2Question);
    }

    if (files?.part2MarkingScheme) {
      formData.append("part2MarkingScheme", files.part2MarkingScheme);
    }

    try {
      if (!id) {
        await createPaper(formData);
        toast.success("Paper successfully created");
      } else {
        await updatePaper(id, formData);
        toast.success("Paper successfully updated");
        navigate(ADMIN_PAPER_MANAGE_PATH);
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
  };

  return (
    <>
      <PageHeader title={id ? "Edit Paper" : "Create Paper"} />
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
                (subject) => subject.value === form.subjectId
              )?.[0]?.label
            }
            placeholder="-- Select --"
            error={errors.subjectId}
            showRequiredLabel
          />
          <TypeOrSelect
            isClearable
            label="Fee"
            name="fee"
            onChange={handleChange}
            options={FEE_OPTIONS}
            value={form.fee}
            placeholder="Eg. Paid"
            error={errors.fee}
            showRequiredLabel
          />
          <FormInput
            type="number"
            name="year"
            label="Year"
            value={form.year}
            onChange={handleChange}
            placeholder="Eg. 2024"
            isRequired
            error={errors.year}
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
            name="longName"
            label="Long name"
            value={form.longName}
            onChange={handleChange}
            isRequired
            error={errors.longName}
            info="Eg. G.C.E Advanced Level - Biology - 2024 (English)"
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Statistics</label>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">
                No of students
              </div>
              <FormInput
                type="number"
                name="noOfStuds"
                value={form?.stats?.noOfStuds}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">A</div>
              <FormInput
                type="number"
                name="a"
                value={form?.stats?.a}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">B</div>
              <FormInput
                type="number"
                name="b"
                value={form?.stats?.b}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">C</div>
              <FormInput
                type="number"
                name="c"
                value={form?.stats?.c}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">S</div>
              <FormInput
                type="number"
                name="s"
                value={form?.stats?.s}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">F</div>
              <FormInput
                type="number"
                name="f"
                value={form?.stats?.f}
                onChange={handleStats}
                isRequired
              />
            </div>
          </div>

          <ImageUpload
            label="Paper I - Structured"
            name="part1StructuredQuestion"
            value={files.part1StructuredQuestion}
            existingValue={
              typeof files?.part1StructuredQuestion === "string" &&
              files?.part1StructuredQuestion?.includes(
                "part1StructuredQuestion"
              )
                ? files.part1StructuredQuestion
                : ""
            }
            allowMaxFileSize={5242880}
            allowFileTypes={["application/pdf"]}
            handleFile={handleFile}
            error={errors.part1StructuredQuestion}
            removeImage={removeImage}
          />

          <ImageUpload
            label="Paper I - Structured - Marking Scheme"
            name="part1StructuredMarkingScheme"
            value={files.part1StructuredMarkingScheme}
            existingValue={
              typeof files?.part1StructuredMarkingScheme === "string" &&
              files?.part1StructuredMarkingScheme?.includes(
                "part1StructuredMarkingScheme"
              )
                ? files.part1StructuredMarkingScheme
                : ""
            }
            allowMaxFileSize={5242880}
            allowFileTypes={["application/pdf"]}
            handleFile={handleFile}
            error={errors.part1StructuredMarkingScheme}
            removeImage={removeImage}
          />

          <ImageUpload
            label="Paper II"
            name="part2Question"
            value={files.part2Question}
            existingValue={
              typeof files?.part2Question === "string" &&
              files?.part2Question?.includes(
                "part2Question"
              )
                ? files.part2Question
                : ""
            }
            allowMaxFileSize={5242880}
            allowFileTypes={["application/pdf"]}
            handleFile={handleFile}
            error={errors.part2Question}
            removeImage={removeImage}
          />

          <ImageUpload
            label="Paper II - Marking Scheme"
            name="part2MarkingScheme"
            value={files.part2MarkingScheme}
            existingValue={
              typeof files?.part2MarkingScheme === "string" &&
              files?.part2MarkingScheme?.includes(
                "part2MarkingScheme"
              )
                ? files.part2MarkingScheme
                : ""
            }
            allowMaxFileSize={5242880}
            allowFileTypes={["application/pdf"]}
            handleFile={handleFile}
            error={errors.part2MarkingScheme}
            removeImage={removeImage}
          />

          <div className="flex gap-2">
            <Button
              label={id ? "Save" : "Submit"}
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

export default CreatePaperMain;
