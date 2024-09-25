import React from "react";
import { NavLink } from "react-router-dom";

const Input = ({
  Icon,

  label,
  placeholder,
  classes = "",
  lableClasses = "",
  iconClasses = "",
  inputClasses = "",
  type = "text",
  labelRightText = "",
  generateRandom = () => {},
  ...props
}) => {
  return (
    <div className={`${classes}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={`mb-[6px] font-medium text-[#06152B] block ${lableClasses}`}
          >
            {label}
          </label>

          {labelRightText && (
            <h6
              onClick={generateRandom}
              className="text-sm text-[#0067FF] cursor-pointer"
            >
              {labelRightText}
            </h6>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          type={type}
          placeholder={placeholder}
          className={`p-[15px] text-[#06152B] rounded-[10px]  w-full placeholder:text-[#B5B7C0] outline-none font-medium bg-white ${inputClasses}`}
          {...props}
        />
        {Icon && (
          <div
            className={`right-4 absolute ${iconClasses} w-fit top-1/2 translate-y-[-50%]`}
          >
            <Icon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
