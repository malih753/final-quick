import React from "react";
import { DeleteIcon } from "../assets/icons";
import { server } from "../Constants/server";

const ProductCard = ({ image, name, price, mrp: discountedPrice }) => {
  return (
    <div className="w-[200px] h-[239px] bg-white rounded-[25px] shadow-product-card-shadow relative border border-[#EEEEEE] p-[14px]">
      <div className="flex justify-center mb-[14px]">
        <img
          // src={`${server}${image}` || "/pr-2.png"}
          src={"/pr-2.png"}
          alt=""
          className="h-[117px] w-[73px] object-cover"
        />
      </div>
      <h2 className="text-sm text-[#90A4AE] mb-[6px]">
        {name || "Zinga vita Vitamin Amla Extract 1000mg Tablet"}
      </h2>
      <p className="text-[#90A4AE]">
        ₹{price || "366"} <strike>₹{discountedPrice || "999"}</strike>
      </p>
      <div className="absolute -right-2 -top-2 w-[32px] flex items-center justify-center h-[32px] rounded-full bg-[#F2222212]">
        <DeleteIcon color={"#F22222"} classNames="w-5 h-5 " />
      </div>
    </div>
  );
};

export default ProductCard;
