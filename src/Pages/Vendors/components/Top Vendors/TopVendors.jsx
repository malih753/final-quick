import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { server } from "../../../../Constants/server";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
const columns = [
  "Business Name",
  "Business Type",
  "Products",
  "Total Orders",
  "Revenue generated",
  "Units sold",
  "Location",
];
const TopVendors = () => {
  const { data, error } = useSWR(`${server}/vendor.topVendors`, fetcher);
  console.log(data);
  return (
    <div className="bg-white rounded-[14.7px] p-[10px] sm:p-5">
      <h1 className="mb-6 text-[#4B4F55]">Top 5 Vendors</h1>
      <div className="block  overflow-x-auto">
        <table className="items-center w-full bg-transparent  border-spacing-y-2.5 border-separate table-auto ">
          <thead>
            <tr className="">
              {columns.map((c) => (
                <th
                  key={c}
                  className={`px-6 text-[#06152B]  text-[11.66px]  align-middle font-medium  pt-1 pb-3 text-left whitespace-nowrap opacity-70 ${
                    c == "Business Name" ? "text-left pl-8" : ""
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.vendors?.map((vendor, index) => (
              <tr key={index} className="bg-[#F1F4FA]">
                <td className="border-t-0 pl-8 whitespace-nowrap px-6 align-middle text-[#06152B] text-[13px] rounded-l-[9.14px] py-5  text-left ">
                {vendor.businessName}
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-[#06152B] text-[13px] py-5  text-left ">
                  {vendor.businessType}
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-black text-[13px] py-5  text-left ">
                  {vendor.totalProducts}
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-black text-[13px] py-5  text-left ">
                  {vendor.totalOrders}
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-black text-[13px] py-5  text-left ">
                  ₹ {vendor.totalRevenue}
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-black text-[13px] py-5  text-left ">
                  5966
                </td>
                <td className="border-t-0  whitespace-nowrap px-6 align-middle text-black rounded-r-[9.14px] text-[13px] py-5  text-left ">
                  <div className="flex items-center capitalize gap-3">
                    {vendor.location}
                    <MoreHorizIcon />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopVendors;
