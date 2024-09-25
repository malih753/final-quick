import React, { useState } from "react";
import Button from "../../Common/Button";
import { PlusIcon } from "../../assets/icons";
import Card from "./components/Card";
import { fetcher } from "../../utils/fetcher";
import { server } from "../../Constants/server";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./components/CreateCategory";
import Spinner from "../../Common/Spinner";

const Category = () => {
  const { data, isLoading } = useSWR(`${server}/productCategory.get`, fetcher);
  console.log(data);

  return (
    <div className="bg-white min-h-[899px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <div className="flex items-center justify-between border-b border-b-black pb-[23px] border-opacity-10">
        <h3 className="text-lg xs:text-[22px] sm:text-[26px] text-black">
          Manage Categories
        </h3>

        <CreateCategory />
      </div>

      {isLoading ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <Spinner classes={"w-[50px] h-[50px]"} />
        </div>
      ) : (
        <div className="mt-[18px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.categories?.map((category) => (
            <Card
              key={category.id}
              name={category.name}
              products={category.products}
              id={category.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
