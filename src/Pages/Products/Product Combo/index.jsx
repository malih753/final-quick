import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { server } from "../../../Constants/server";
import { fetcher } from "../../../utils/fetcher";
import Button from "../../../Common/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  PlusIcon,
  SortIcon,
} from "../../../assets/icons";
import ProductComboModal from "./components/Product Combo Modal/ProductComboModal";
import { tryParseImages } from "../../../utils/tryParseImages";
import DeleteProductModal from "../../../Common/DeleteProductModal";

const columns = [
  "Product",
  "Price",
  "Purchased",
  "Stock",
  "Expiry date",
  "Action",
];

const Products = () => {
  const navigate = useNavigate();

  const { data, error } = useSWR(`${server}/product.get`, fetcher);

  console.log(data);

  if (error) {
    console.log(error);
  }

  return (
    <div className="pb-5 lg:pb-0">
      <div className="flex flex-wrap w-full relative justify-between gap-5">
        <Button btnClass="text-black" onClick={() => navigate("/add-product")}>
          <PlusIcon />
          <span className="text-xs text-[#15A9A0] font-medium font-poppins">
            Add Product
          </span>
        </Button>
        <div className="flex flex-wrap  gap-3">
          <Button
            btnClass="font-medium font-poppins bg-[#15A9A0] text-white"
            title="Product combo"
          />

          {/* <Button btnClass="text-black ">
            <span className="text-xs font-medium">Filter</span>
            <FilterIcon />
          </Button> */}
          <Button btnClass="text-black ">
            <span className="text-xs font-medium">Sort</span>
            <SortIcon />
          </Button>
        </div>
      </div>

      <div className=" overflow-x-auto mt-[15px]  pt-4 pb-[14px] lg:mb-[42px] bg-transparent border-t border-t-black border-opacity-10 ">
        <div className="flex items-center justify-between pb-4 px-0 sm:px-5">
          <h3 className="text-black font-medium text-lg">Top Selling</h3>
          {/* <LabModal/> */}
          <ProductComboModal />
        </div>
        <div className="block px-6  w-full bg-white rounded-[9.14px] overflow-x-auto">
          <table
            className="items-center bg-transparent w-full  border-separate"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    className={`px-6 text-[11.64px] text-[#4D5869]   align-middle  py-3  font-medium whitespace-nowrap text-center`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((p) => (
                <tr key={p.id} className="bg-[#F1F4FA]">
                  <th className="border-t-0 px-6 align-middle    p-3 text-left rounded-l-[9.14px]">
                    <div className="flex items-center gap-2">
                      <img
                        src={`${server}${
                          p?.images?.length > 0
                            ? tryParseImages(p.images)
                            : ""
                        }`}
                        // src="/bottle.png"
                        alt="image"
                        className="w-12 h-12 object-cover rounded-[1.84px]"
                      />
                      <h6 className="text-[#06152B] font-medium font-poppins text-xs w-[150px]">
                        {p.productName}
                      </h6>
                    </div>
                  </th>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap py-3 text-center font-medium font-poppins text-[#06152B] ">
                    ₹ {p.sellingPrice}
                  </td>
                  <td className=" px-6 align-middle font-medium font-poppins text-xs whitespace-nowrap text-center py-3 text-[#06152B] ">
                    {p.totalSales}
                  </td>
                  <td className=" px-6 align-middle font-medium font-poppins text-xs whitespace-nowrap py-3 text-center text-[#06152B] ">
                    584
                  </td>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap py-3 text-center font-medium font-poppins text-[#06152B] ">
                    {p.expireDate}
                  </td>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap p-3 text-[#06152B] rounded-r-[9.14px]">
                    <div className="flex items-center gap-2">
                      {/* <Button
                        title="Delete"
                        btnClass="rounded-[7.37px] font-medium font-poppins bg-[#15A9A0] text-white hover:bg-white hover:text-[#15A9A0] duration-300 py-[7.37px] px-[11.05px]"
                      /> */}
                      <DeleteProductModal productId={p.id} />
                      <Button
                        title="Stock update"
                        btnClass="rounded-[7.37px] font-poppins font-medium border-[0.91px] border-[#15A9A0] hover:bg-[#15A9A0] hover:text-white bg-transparent duration-300 py-[7.37px] px-[11.05px]"
                      />
                      <span className="text-[#15A9A0] underline cursor-pointer font-medium font-poppins">
                        Edit
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 absolute bg-pagination-gradient bottom-0 left-1/2 translate-x-[-50%] flex w-full justify-center pb-5">
          <div className="flex justify-between w-[300px] sm:w-[500px] pt-5 h-[80px] items-center">
            <div className="cursor-pointer">
              <ArrowLeftIcon />
            </div>

            <h5 className="text-[#6B6B6B] text-sm ">Page 1 of 8</h5>
            <div className="cursor-pointer">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
      <div className=" overflow-x-auto mt-[15px]  pt-4 pb-[14px] mb-[80px] bg-transparent border-t border-t-black border-opacity-10">
        <div className="flex items-center justify-between pb-4  px-0 sm:px-5">
          <h3 className="text-black font-medium text-lg">Most Popular</h3>
          {/* <LabModal/> */}
          {/* <ProductComboModal /> */}
        </div>
        <div className="block px-6  w-full bg-white rounded-[9.14px] overflow-x-auto">
          <table
            className="items-center bg-transparent w-full  border-separate"
            style={{ borderSpacing: "0 10px" }}
          >
            <thead>
              <tr>
                {columns.map((c) => (
                  <th
                    className={`px-6 text-[11.64px] text-[#4D5869]   align-middle  py-3  font-medium whitespace-nowrap text-center`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((p) => (
                <tr key={p.id} className="bg-[#F1F4FA]">
                  <th className="border-t-0 px-6 align-middle    p-3 text-left rounded-l-[9.14px]">
                    <div className="flex items-center gap-2">
                      <img
                        // src={`${server}${p?.images?.length > 0 && p.images[0]}`}
                        src={server + tryParseImages(p?.images)}
                        alt="image"
                        className="w-12 h-12 object-cover rounded-[1.84px]"
                      />
                      <h6 className="text-[#06152B] font-medium font-poppins text-xs w-[150px]">
                        {p.productName}
                      </h6>
                    </div>
                  </th>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap py-3 text-center font-medium font-poppins text-[#06152B] ">
                    ₹ {p.sellingPrice}
                  </td>
                  <td className=" px-6 align-middle font-medium font-poppins text-xs whitespace-nowrap text-center py-3 text-[#06152B] ">
                    {p.totalSales}
                  </td>
                  <td className=" px-6 align-middle font-medium font-poppins text-xs whitespace-nowrap py-3 text-center text-[#06152B] ">
                    584
                  </td>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap py-3 text-center font-medium font-poppins text-[#06152B] ">
                    {p.expireDate}
                  </td>
                  <td className=" px-6 align-middle  text-xs whitespace-nowrap p-3 text-[#06152B] rounded-r-[9.14px]">
                    <div className="flex items-center gap-2">
                      {/* <Button
                        title="Delete"
                        btnClass="rounded-[7.37px] font-medium font-poppins bg-[#15A9A0] text-white hover:bg-white hover:text-[#15A9A0] duration-300 py-[7.37px] px-[11.05px]"
                      /> */}
                      <DeleteProductModal productId={p.id} />
                      <Button
                        title="Stock update"
                        btnClass="rounded-[7.37px] font-poppins font-medium border-[0.91px] border-[#15A9A0] hover:bg-[#15A9A0] hover:text-white bg-transparent duration-300 py-[7.37px] px-[11.05px]"
                      />
                      <span className="text-[#15A9A0] underline cursor-pointer font-medium font-poppins">
                        Edit
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 absolute bg-pagination-gradient bottom-0 left-1/2 translate-x-[-50%] flex w-full justify-center pb-5">
          <div className="flex justify-between w-[300px] sm:w-[500px] pt-5 h-[80px] items-center">
            <div className="cursor-pointer">
              <ArrowLeftIcon />
            </div>

            <h5 className="text-[#6B6B6B] text-sm ">Page 1 of 8</h5>
            <div className="cursor-pointer">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
