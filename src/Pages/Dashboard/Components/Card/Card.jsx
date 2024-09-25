import React from "react";

const Card = ({ value, title, icon, sub_title, color, bgColor }) => {
  return (
    <div
      className="w-full sm:w-[160px] p-[17.88px] pr-3 h-[164px]  rounded-[14.3px]"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="w-[35px] h-[35px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {icon()}
      </div>

      <h1 className="text-[21px] text-[#151D48] mt-[14px] mb-[6px]">{value}</h1>
      <h4 className="text-[#425166] text-sm mb-[6px]">{title}</h4>

      <p className="text-[#4079ED] text-[10.73px]">{sub_title}</p>
    </div>
  );
};

export default Card;
