import React from "react";

const Button = ({ title = "", children, btnClass = "", ...props }) => {
  return (
    <button className={`btn ${btnClass}`} {...props}>
      {children ? children : title}
    </button>
  );
};

export default Button;
