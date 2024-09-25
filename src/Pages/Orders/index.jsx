import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DownloadCircleIcon,
  FilterIcon,
  SortIcon,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";

const Orders = () => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/orders/${id}`);
  };

  const [orders, setOrders] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const { data, isLoading } = useSWR(`${server}/adminOrder`, fetcher);

  const sortedData = data?.adminOrders?.sort((a, b) => {
    return b.sellingPrice - a.sellingPrice;
  });

  const handleSort = () => {
    setIsSorted(!isSorted);
  };

  useEffect(() => {
    console.log(sortedData);
    if (isSorted) {
      setOrders(sortedData);
    } else {
      setOrders(data?.adminOrders);
    }
  }, [sortedData]);

  console.log(data);
  return (
    <div className="pb-5 lg:pb-0">
      <div className="flex flex-wrap w-full justify-end gap-3">
        {/* <Button btnClass="text-black ">
          <span className="text-xs font-medium">Filter</span>
          <FilterIcon />
        </Button> */}
        <Button btnClass="text-black" onClick={handleSort}>
          <span className="text-xs font-medium">Sort</span>
          <SortIcon />
        </Button>
      </div>

      <div className=" overflow-x-auto relative mt-[15px] pl-3 pt-3 pb-[14px] pr-[23px] min-h-[872px] lg:mb-[42px] bg-white rounded-[5px]">
        <h1 className="font-poppins font-bold text-[#292929] mb-3">
          Order Updates
        </h1>
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 font-poppins bg-[#A4EAE5] rounded-tl-[5px] text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Page name
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Order ID
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Date
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Customer name
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Product
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Amount
                </th>
                <th className="px-6 font-poppins bg-[#A4EAE5]  text-blueGray-500 align-middle  py-3   whitespace-nowrap font-normal text-left">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order?.id}
                  onClick={
                    order.status === "Delivered" && handleNavigate(order.id)
                  }
                >
                  <th className="border-t-0 px-6 align-middle   whitespace-nowrap p-3 text-left ">
                    <h6
                      className={`text-[#444444] font-medium text-sm  rounded-full text-center px-[5px] py-[2px] ${
                        order?.status === "Delivered"
                          ? "bg-[#FFC0A2]"
                          : "bg-[#5EFD8B]"
                      } ${order.status === "Cancelled" && "bg-[#FFA1A1]"}`}
                    >
                      New-Order
                    </h6>
                  </th>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    #11232
                  </td>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    Jun 29,2022
                  </td>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    {order.userId?.name}
                  </td>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    Oxitocin 25mg
                  </td>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    ₹400.00
                  </td>
                  <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                    {/* ----- */}
                    {order.status === "Delivered" ? (
                      <Button btnClass="flex itemcenter justify-center bg-[#A5EAA4] font-poppins rounded-[8px] p-[6px] font-normal text-[#292929]">
                        <span>Download Invoice</span>
                        <DownloadCircleIcon />
                      </Button>
                    ) : (
                      "-----"
                    )}
                  </td>
                </tr>
              ))}

              {/* <tr>
                <th className="border-t-0 px-6 align-middle   whitespace-nowrap p-3 text-left ">
                  <h6
                    className={`"text-[#444444] font-medium text-sm bg-[#FFC0A2] rounded-full text-center px-[5px] py-[2px]"`}
                  >
                    Delivered
                  </h6>
                </th>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  #11232
                </td>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  Jun 29,2022
                </td>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  Afaq Karim
                </td>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  Oxitocin 25mg
                </td>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  ₹400.00
                </td>
                <td className=" px-6 align-middle font-poppins text-sm whitespace-nowrap p-3 text-[#292929] font-normal">
                  -----
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>

        <div className="mt-10 absolute bottom-0 left-1/2 translate-x-[-50%] flex justify-center pb-5">
          <div className="flex w-[280px] sm:w-[472px] justify-between h-10 items-center">
            <div className="cursor-pointer">
              <ArrowLeftIcon />
            </div>

            <h5 className="font-medium text-sm font-poppins">Page 1 of 8</h5>
            <div className="cursor-pointer">
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
