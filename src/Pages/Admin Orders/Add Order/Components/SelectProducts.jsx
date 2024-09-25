import React from "react";
import { SearchIcon } from "../../../../assets/icons";
import ProductCard from "../../../../Common/ProductCard";

const SelectProducts = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[24px] text-[#15A9A0] ">Select Products</h1>
        <div className="btn bg-[#15A9A01A] relative w-full sm:w-[385px]">
          <input
            type="text"
            className="border-none text-[#15A9A0] outline-none bg-transparent placeholder:text-[#15A9A0] w-full"
            placeholder="Search Product"
          />
          <SearchIcon classNames={"w-6 h-6"} color={"#15A9A0"} />
        </div>
      </div>

      {/* <div className="flex items-center justify-center h-full mt-[112px] flex-col gap-5">
        <img
          src="/select-products.png"
          alt=""
          className="w-[290px] object-cover h-[255px]"
        />
        <p className="text-[22px] text-black opacity-60 sm:text-[28px]">Search Products to select them</p>
      </div> */}
      <div className="mt-6">
        <ProductCard/>
      </div>
    </>
  );
};

export default SelectProducts;
