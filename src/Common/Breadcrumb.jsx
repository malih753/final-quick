import React from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const path = useLocation().pathname;
  console.log(path.split("/"));

  return (
    <div className=" items-center lg:flex hidden text-black gap-2">
      {path.split("/")[2] ? (
        <>
          <span className="text-white text-lg capitalize">
            {path.split("/")[1].includes("-")
              ? path.split("/")[1].replace("-", " ")
              : path.split("/")[1]}{" "}
            &#62;
          </span>
          <h2 className="text-[#030229] font-semibold text-[22px] sm:text-[30px]">
            {path.split("/")[2].includes("-")
              ? path.split("/")[2].replace("-", " ")[0].toUpperCase() +
                path.split("/")[2].replace("-", " ").slice(1)
              : path.split("/")[2][0].toUpperCase() +
                path.split("/")[2].slice(1)}
          </h2>
        </>
      ) : (
        <h2 className="text-black capitalize font-semibold text-[22px]  sm:text-[34px]">
          {path.split("/")[1].includes("-")
            ? path.split("/")[1].replace("-", " ")
            : path.split("/")[1]}
          {path.split("/")[1] === "products" && " List"}
        </h2>
      )}
      {path === "/" && (
        <h2 className="text-black capitalize font-semibold text-[22px]  sm:text-[34px]">
          Dashboard
        </h2>
      )}
    </div>
  );
};

export default Breadcrumb;
