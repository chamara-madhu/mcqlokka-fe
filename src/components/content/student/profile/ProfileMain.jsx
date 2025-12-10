import React, { useState, useCallback, useEffect } from "react";
import { User, Camera, Save, X, CheckCircle } from "feather-icons-react";
import userService from "../../../../services/user.service";
import FormInput from "../../../shared/fields/FormInput";
import { toast } from "react-toastify";
import PageLoader from "../../../shared/loading/PageLoader";
import config from "../../../../config/aws";

const initialState = {
  name: "",
  email: "",
  avatar: null,
};

const ProfileMain = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [preLoading, setPreLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateMyProfile, myData } = userService();

  useEffect(() => {
    const fetch = async () => {
      setPreLoading(true);

      try {
        const res = await myData();

        setForm((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
        setPreviewUrl(res.data.avatar ? `${config.S3_PUBLIC_URL}/${res.data.avatar}` : null);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setPreLoading(false);
      }
    };

    fetch();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 100 * 1024) {
      // 100 KB
      let avatar = "Image must be less than 100 KB";

      setErrors((prev) => ({
        ...prev,
        avatar,
      }));

      return;
    }

    if (file) {
      if (file.type.startsWith("image/")) {
        setForm({ ...form, avatar: file });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setErrors((prev) => ({
        ...prev,
        avatar: '',
      }));
      } else {
        alert("Please upload an image file");
      }
    }
  };

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
    let name = "";
    let avatar = "";

    // Validate name
    if (!form.name) {
      name = "Name is required";
    }

    // Validate avatar ONLY if user selected a file
    if (form.avatar) {
      if (form.avatar.size > 100 * 1024) {
        // 100 KB
        avatar = "Avatar must be less than 100 KB";
      }
    }

    // Check if any error exists
    if (name || avatar) {
      setErrors((prev) => ({
        ...prev,
        name,
        avatar,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!isValid()) return;

    setLoading(true);

    const formData = new FormData();
    formData.set("name", form.name);
    formData.append("avatar", form.avatar);

    try {
      await updateMyProfile(formData);
      toast.success("Your profile successfully updated");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setForm({ ...form, avatar: null, name: "Chamara Silva" });
  };

  // const removePhoto = () => {
  //   setPreviewUrl(null);
  //   setForm({ ...form, avatar: null });
  //   setIsEditing(true);
  // };

  if (preLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto shadow-md rounded-2xl bg-white px-7 py-10 border-2 border-purple-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-7">
          <div className="relative mb-1">
            <span className="inline-flex h-36 w-36 items-center justify-center rounded-full border-4 border-purple-200 bg-gray-100 shadow-lg ring-4 ring-white">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="w-20 h-20 text-gray-300" />
              )}
              <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer border-2 border-purple-100 hover:bg-purple-50 transition">
                <Camera className="w-6 h-6 text-purple-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </span>
          </div>
          <p className="text-sm text-gray-500">Max image size is 100KB.</p>
          {errors.avatar ? (
            <p className="text-sm text-red-700">{errors.avatar}</p>
          ) : (
            ""
          )}
          <h2 className="font-bold text-2xl mt-3 text-gray-900">Profile Settings</h2>
          <p className="text-gray-500 mt-1">Update your personal info below</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name */}
          <FormInput
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            isRequired
            error={errors.name}
          />

          {/* Email */}
          <FormInput
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            isRequired
            disabled={true}
            info="Contact support to change email"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 py-3 rounded-lg font-bold transition ${
              loading
                ? "bg-gray-300"
                : "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:bg-purple-700"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-200 font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
