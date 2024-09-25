import React from "react";
import { CategoryCardIcon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

const Card = ({ name, products ,id}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/category/${id}`);
  };
  return (
    <div onClick={handleNavigate} className="bg-[#15A9A0] cursor-pointer py-5 px-[14px] rounded-[15px]  relative">
      <h2 className="text-xl sm:text-2xl text-white leading-[30px]">{name}</h2>
      <p className="text-white text-lg mt-8">
        {products.length + " "} Products
      </p>
      <div className="absolute left-0 bottom-0">
        <CategoryCardIcon />
      </div>
    </div>
  );
};

export default Card;
