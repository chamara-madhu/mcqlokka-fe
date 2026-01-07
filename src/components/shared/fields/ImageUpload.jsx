import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { UploadCloud, X } from "feather-icons-react";
import config from "../../../config/aws";

const ImageUpload = ({
  name,
  value,
  handleFile,
  existingValue,
  label,
  labelClass,
  removeImage,
  allowMaxFileSize = 1024 * 1024 * 2, // 2MB
  allowFileTypes = ["image/jpeg", "image/png"],
  showRequiredLabel = false,
  error,
  height = "200px",
}) => {
  const [fileErr, setFileErr] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const uploadInput = useRef(null);

  const handleUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];

      if (file.size > allowMaxFileSize) {
        setFileErr("File size not allowed. Maximum size: 100KB.");
      } else if (!allowFileTypes.includes(file?.type)) {
        setFileErr("File type is not allowed");
      } else {
        handleFile(name, e.target.files[0]);
        setFileErr("");
      }
    },
    [allowMaxFileSize, handleFile, name]
  );

  const openImageUpload = () => {
    if (!uploadInput.current) return;
    uploadInput.current.click();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOverAndEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    let draggedData = e.dataTransfer;
    let file = draggedData.files;

    handleFile(name, file[0]);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        className={classNames(
          "text-sm font-medium leading-[20px] text-pp-gray-700",
          labelClass
        )}
      >
        {label} {showRequiredLabel ? "*" : null}
      </label>
      {value || existingValue ? (
        <div className="flex justify-center">
          <div
            className="relative flex items-center justify-center w-full border rounded-lg border-pp-gray-300"
            style={{ height: height }}
          >
            <img
              src={existingValue ? `${config.S3_PUBLIC_URL}/${existingValue}` : URL.createObjectURL(value)}
              className="object-cover w-auto h-auto max-w-full max-h-full"
              alt={name}
              loading="lazy"
            />
            <X
              onClick={() => removeImage(name)}
              color="#667085"
              className="absolute p-1 bg-white border rounded-full cursor-pointer w-7 h-7 top-2 right-2 hover:border-pp-gray-600"
            />
          </div>
        </div>
      ) : (
        <div>
          <div
            onDragLeave={onDragLeave}
            onDragEnter={onDragOverAndEnter}
            onDragOver={onDragOverAndEnter}
            onDrop={onDrop}
            className={classNames(
              "flex flex-col items-center gap-4 py-4 px-6 self-stretch rounded-lg border ",
              isDragging
                ? "border-pp-primary-300 bg-pp-primary-25"
                : "border-pp-gray-400 bg-white",
              error ? "!border-red-500" : ""
            )}
          >
            <div className="flex flex-col items-center self-stretch gap-3">
              <div>
                <UploadCloud size={16} color="#667085" />
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="text-sm cursor-pointer text-purple-600 text-pp-primary-700"
                    onClick={openImageUpload}
                  >
                    Click to upload
                  </button>
                  <span
                    className={
                      "text-sm " +
                      (isDragging ? "text-pp-primary-600" : "text-pp-gray-500")
                    }
                  >
                    or drag and drop
                  </span>
                </div>
                <input
                  className="hidden"
                  ref={uploadInput}
                  multiple
                  accept={allowFileTypes.join(",")}
                  onChange={handleUpload}
                  type="file"
                />
                <span
                  className={
                    "text-xs " +
                    (isDragging ? "text-pp-primary-600" : "text-pp-gray-500")
                  }
                >
                  {allowFileTypes
                    .map((type) => type.split("/")[1].toUpperCase())
                    .join(", ")}{" "}
                  (Max. {allowMaxFileSize / (1024 * 1024)} MB)
                </span>
              </div>
            </div>
          </div>
          {(fileErr || error) && (
            <p className="mt-1 text-sm text-red-500">{error || fileErr}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
