import React from "react";
import useSWR from "swr";
import Button from "../../Common/Button";
import { server } from "../../Constants/server";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "../../assets/icons";
import { fetcher } from "../../utils/fetcher";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Common/Spinner";
const columns = [
  "Discount code",
  "Discount Description",
  "Use limit",
  "Last Modified",
  "Status",
];

const Coupons = () => {
  const { data, isLoading } = useSWR(`${server}/coupon.get`, fetcher);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/coupons/add-coupon");
  };
  console.log(data);
  return (
    <div className="border-t border-opacity-10 border-t-black mb-32">
      <div>
        <div className="flex items-center justify-between py-6">
          <h1 className="text-[#4B4F55] font-medium">Products Coupons live</h1>
          <Button
            onClick={handleNavigate}
            btnClass="bg-[#15A9A0] text-white rounded-[9.17px] py-[8.25px] px-[18px] "
          >
            <PlusIcon width={15} height={15} color={"white"} />
            <span className="text-xs font-medium">Add New</span>
          </Button>
        </div>

        <div className="py-3 px-4 w-full bg-white rounded-[9.17px] ">
          <div className="block w-full overflow-x-auto">
            {isLoading ? (
              <div className="w-full h-[427px] flex items-center justify-center">
                <Spinner classes={"w-[70px] h-[70px]"} />
              </div>
            ) : (
              <table className="items-center bg-transparent w-full border-spacing-y-2.5 border-separate table-auto ">
                <thead>
                  <tr className="">
                    {columns.map((c) => (
                      <th
                        key={c}
                        className="px-6 text-[#06152B] opacity-70 text-[11.55px]  align-middle   py-3  whitespace-nowrap text-left"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.coupons?.map((c) => (
                    <tr key={c.id} className="bg-[#F1F4FA]">
                      <td className="border-t-0 px-6 align-middle text-[#06152B] text-[13px]  rounded-l-[9.14px] py-[17px] text-left ">
                        {c.couponCode}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-[#06152B] text-[13px]  py-[17px] text-left ">
                        {c.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-black text-[13px]  py-[17px] text-left ">
                        {c.limitPerUser == 1 ? "Single Use" : c.limitPerUser}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-black text-[13px]  py-[17px] text-left ">
                        12/10/2001
                      </td>
                      <td
                        className={`border-t-0 px-6 align-middle text-[#2EDB72] text-[13px] rounded-r-[9.14px] py-[17px] text-left`}
                      >
                        <div className="flex items-center gap-5 justify-between">
                          Active
                          <MoreHorizIcon sx={{ color: "#030229" }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between pt-8 pb-3">
          <h1 className="text-[#4B4F55] font-medium">LabTests Coupons live</h1>
          <Button
            onClick={handleNavigate}
            btnClass="bg-[#15A9A0] text-white rounded-[9.17px] py-[8.25px] px-[18px] "
          >
            <PlusIcon width={15} height={15} color={"white"} />
            <span className="text-xs font-medium">Add New</span>
          </Button>
        </div>

        <div className="py-3 px-4 w-full bg-white rounded-[9.17px]">
          <div className="block w-full overflow-x-auto">
            {isLoading ? (
              <div className="w-full h-[427px] flex items-center justify-center">
                <Spinner classes={"w-[70px] h-[70px]"} />
              </div>
            ) : (
              <table className="items-center bg-transparent w-full border-spacing-y-2.5 border-separate table-auto ">
                <thead>
                  <tr className="">
                    {columns.map((c) => (
                      <th
                        key={c}
                        className="px-6 text-[#06152B] opacity-70 text-[11.55px]  align-middle   py-3  whitespace-nowrap text-left"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.coupons?.map((c) => (
                    <tr key={c.id} className="bg-[#F1F4FA]">
                      <td className="border-t-0 px-6 align-middle text-[#06152B] text-[13px]  rounded-l-[9.14px] py-[17px] text-left ">
                        {c.couponCode}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-[#06152B] text-[13px]  py-[17px] text-left ">
                        {c.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-black text-[13px]  py-[17px] text-left ">
                        {c.limitPerUser == 1 ? "Single Use" : c.limitPerUser}
                      </td>
                      <td className="border-t-0 px-6 align-middle text-black text-[13px]  py-[17px] text-left ">
                        12/10/2001
                      </td>
                      <td
                        className={`border-t-0 px-6 align-middle text-[#2EDB72] text-[13px] rounded-r-[9.14px] py-[17px] text-left`}
                      >
                        <div className="flex items-center gap-5 justify-between">
                          Active
                          <MoreHorizIcon sx={{ color: "#030229" }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
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
  );
};

export default Coupons;
