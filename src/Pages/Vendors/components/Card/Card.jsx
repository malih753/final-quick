import React from "react";

const Card = ({ value, title }) => {
  return (
    <div className="w-full xs:w-[48%] sm:w-[180px] bg-white shadow-vendor-card-shadow p-[17.88px] h-[119px]  rounded-[10.29px] pt-[14px] pr-[23px] pb-[34px] pl-[10.29px]">
      <h1 className="text-sm text-black mb-[22px]">{title}</h1>
      <h4 className="text-[#15A9A0] text-[24px] sm:text-[28px]">{value}</h4>
    </div>
  );
};

export default Card;
