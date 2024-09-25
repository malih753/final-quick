import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import {
  ArrowDown2Icon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  SortIcon,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";
import axios from "axios";

const columns = [
  "Status",
  "Order ID",
  "Date",
  "Customer Name",
  "Product",
  "Amount",
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // Track sort order
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = () => {
    setIsSorted(true);
    setIsAscending(!isAscending); // Toggle sort order
  };

  const handleNavigate = () => {
    navigate("/add-order");
  };

  const { data, error } = useSWR(`${server}/adminOrder`, fetcher);

  console.log(data);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data) {
      let updatedOrders = [...data?.adminOrders];

      // Search filter
      if (search) {
        updatedOrders = updatedOrders.filter((order) =>
          order?.product?.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Sort orders
      if (isSorted) {
        updatedOrders.sort((a, b) => {
          return isAscending
            ? new Date(a?.createdAt) - new Date(b?.createdAt)
            : new Date(b?.createdAt) - new Date(a?.createdAt);
        });
      }

      setOrders(updatedOrders);
    }
  }, [search, data, isSorted, isAscending]);

  return (
    <div className="pb-5 lg:pb-0">
      <div className="flex flex-wrap w-full relative justify-between gap-5">
        <Button btnClass="text-black" onClick={handleNavigate}>
          <PlusIcon />
          <span className="text-xs text-[#15A9A0]">Order For Someone</span>
        </Button>
        <div className="flex flex-wrap  gap-3">
          <div className="btn relative w-full sm:w-[150px]">
            <input
              type="text"
              className="border-none text-[#15A9A0] outline-none bg-transparent placeholder:text-[#15A9A0] w-full"
              placeholder="Search Product"
              onChange={handleSearchChange}
              value={search}
            />
            <SearchIcon classNames={"w-6 h-6"} color={"#15A9A0"} />
          </div>
          <div className="flex items-center flex-wrap gap-3">
            {/* <Button btnClass="text-black ">
                <span className="text-xs font-medium">Filter</span>
                <FilterIcon />
              </Button> */}

            <Button btnClass="text-black " onClick={handleSort}>
              <span className="text-xs font-medium">Sort</span>
              <SortIcon />
            </Button>
          </div>
        </div>
      </div>

      <h1 className="mt-[23px] border-t border-t-black border-opacity-10 text-[18px] font-medium text-[#06152B] pt-3 sm:text-[26px] teext-[22px]">
        Past orders
      </h1>

      <div className="overflow-auto lg:overflow-hidden lg:hover:overflow-auto mt-[15px]  pt-5 pb-[14px]   h-[872px] lg:mb-[42px] bg-transparent border-t border-t-black border-opacity-10">
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr className="bg-[#A4EAE5]">
                {columns.map((c) => (
                  <th
                    key={c}
                    className="px-6 text-[#292929]   align-middle   py-3  whitespace-nowrap text-left"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id}>
                  <th className="border-t-0 px-6 align-middle  whitespace-nowrap  p-3 text-left ">
                    <h6 className="text-[#444444] font-medium text-sm bg-[#5EFD8B] rounded-full text-center px-[5px] py-[2px]">
                      {order.status}
                    </h6>
                  </th>
                  <td className=" px-6 align-middle  text-sm whitespace-nowrap p-3 text-[#292929] ">
                    {order.orderId}
                  </td>
                  <td className=" px-6 align-middle  text-sm whitespace-nowrap p-3 text-[#292929] ">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className=" px-6 align-middle  text-sm whitespace-nowrap p-3 text-[#292929] ">
                    {order.userId?.name}
                  </td>
                  <td className=" px-6 align-middle  text-sm whitespace-nowrap p-3 text-[#292929] ">
                    Oxitocin 25mg
                  </td>
                  <td className=" px-6 align-middle  text-sm whitespace-nowrap p-3 text-[#292929] ">
                    ₹{order.amount.toFixed(2)}
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

export default AdminOrders;
