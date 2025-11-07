import { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
import classnames from "classnames";

const TypeOrSelect = (
  (
    {
      className,
      labelClass,
      inputClass,
      label,
      name: fieldName,
      value,
      placeholder,
      options,
      error,
      showRequiredLabel = false,
      onChange,
    },
  ) => {
    const [optionValue, setOptionValue] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setOptionValue({
          label: value,
          value: value,
        });
      };

      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const customStyles = {
      control: (styles, { isFocused }) => ({
        ...styles,
        boxShadow: isFocused
          ? "0px 0px 0px 4px #F4EBFF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
          : "none",
        border: error ? "1px solid #e94848" : "1px solid #D0D5DD",
        borderRadius: 7,
        height: 45.6,
        width: "100%",
        cursor: "pointer",

        ":hover": {
          borderColor: "#D0D5DD",
        },
      }),
      menu: (styles) => ({
        ...styles,
        borderRadius: 7,
        zIndex: 999999,
      }),
    };

    return (
      <div
        className={classnames("flex flex-col gap-1.5", className)}
        style={{ position: "relative" }}
      >
        {label && (
          <label
            className={classnames(
              "text-sm font-medium leading-[20px]",
              labelClass
            )}
          >
            {label} {showRequiredLabel ? "*" : null}
          </label>
        )}
        <div
          className={classnames(
            "flex outline-none w-full bg-white shadow-xs",
            inputClass
          )}
          style={{ position: "relative" }}
        >
          <Select
            onChange={(newValue) => {
              setOptionValue(newValue);
              onChange({
                target: {
                  name: fieldName,
                  value: newValue?.value,
                },
              });
            }}
            options={
              optionValue &&
              !options.some((option) => option.label === optionValue.label)
                ? [...options, optionValue]
                : [...options]
            }
            value={optionValue}
            className="w-full"
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "#F4EBFF",
                primary: "#D6BBFB",
              },
            })}
            placeholder={placeholder}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default TypeOrSelect;
