import React from "react";
import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center absolute bg-white bg-opacity-90 top-0 ">
      <Spinner classes={"w-[70px] h-[70px]"} />
    </div>
  );
};

export default Loader;
