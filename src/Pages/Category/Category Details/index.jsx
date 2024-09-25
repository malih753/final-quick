import React from "react";
import Button from "../../../Common/Button";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { server } from "../../../Constants/server";
import { fetcher } from "../../../utils/fetcher";
import Input from "../../../Common/Input";
import {
  CategoryEditIcon,
  FilterIcon,
  GreySearchIcon,
} from "../../../assets/icons";
import ProductCard from "../../../Common/ProductCard";
import { Pagination } from "@mui/material";
import Spinner from "../../../Common/Spinner";

const CategoryDetails = () => {
  const params = useParams();

  const { data, isLoading } = useSWR(
    `${server}/productCategory.get/${params.id}`,
    fetcher
  );

  

  console.log(data);
  return (
    <div className="bg-white min-h-[899px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px] relative">
      {isLoading ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <Spinner classes={"w-[50px] h-[50px]"} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-b-black pb-[23px] border-opacity-10">
            <h3 className="text-[22px] sm:text-[26px] text-black">
              {data?.category?.name}
            </h3>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-[14px]">
                <Input
                  Icon={GreySearchIcon}
                  placeholder="Search"
                  iconClasses="left-2"
                  inputClasses="pl-9 border rounded-[6px] py-[7px] border-[#00000021]"
                />
                {/* <Button btnClass="text-black py-[7px] px-[11px] border rounded-[6px] border-[#00000021]">
                  <div className="flex items-center gap-2 opacity-30 ">
                    <FilterIcon />
                    <span className="text-xs font-medium">Filters</span>
                  </div>
                </Button> */}
              </div>

              <Button btnClass="bg-[#15A9A0] text-white py-[8px] px-2.5 text-sm sm:text-lg">
                <CategoryEditIcon />
                <span>Edit Category</span>
              </Button>
            </div>
          </div>

          <div className="mt-[18px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data?.category?.products?.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.sellingPrice}
                image={product.images[0].image}
                mrp={product.mrp}
              />
            ))}
          </div>
          <div className="flex w-full absolute bottom-5 left-1/2 translate-x-[-50%] items-center justify-center my-5 flex-col gap-3">
            <h6 className="text-[9.22px]">Showing 1 to 10 of 45 entries</h6>
            <Pagination
              count={10}
              siblingCount={1}
              variant="outlined"
              color="primary"
              sx={{
                ".MuiPagination-ul li button": {
                  color: "#15A9A0",
                  border: "1px solid #15A9A0",
                },
                ".MuiPagination-ul li:first-child button, .MuiPagination-ul li:last-child button ":
                  {
                    border: "1px solid white",
                  },
                ".MuiPagination-ul": {
                  gap: { xs: "5px", sm: 0 },
                },
              }}
              onChange={(e) => {
                console.log(e.target.innerText);
              }}
              onSelect={(e) => {
                console.log(e);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetails;
