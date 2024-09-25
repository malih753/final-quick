import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { DownloadIcon, GreySearchIcon } from "../../../../assets/icons";
import Input from "../../../../Common/Input";
import { server } from "../../../../Constants/server";
import useSWR from "swr";
import { fetcher } from "../../../../utils/fetcher";
import PaginationOutlined from "../../../../Common/Pagination";
import Spinner from "../../../../Common/Spinner";

const columns = [
  "Business Name",
  "Business Type",
  "Products",
  "Total Orders",
  "Revenue generated",
  "Units sold",
  "Location",
];
const VendorsList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);

  const { data, error, isLoading } = useSWR(
    `${server}/vendor.get?page=${page}&limit=${limit}`,
    fetcher
  );
  console.log(data);

  const handleLimitChange = (e) => {
    console.log(e);
    setLimit(e.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (e) => {
    if (e.target.innerText) {
      setPage(e.target.innerText);
    } else if (e.target.getAttribute("data-testid") === "NavigateNextIcon") {
      console.log("next tk agya");
      setPage(page + 1);
    } else if (e.target.getAttribute("data-testid") === "NavigateBeforeIcon") {
      console.log("previous tk agya");
      setPage(page - 1);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredVendors = data?.vendors.filter((vendor) => {
        return vendor.businessName.toString().toLowerCase().includes(search.toLowerCase());
      });
      setVendors(filteredVendors);
    } else {
      setVendors(data?.vendors);
    }
  }, [search, data]);

  return (
    <>
      <div className="bg-white rounded-[14.7px] p-[10px] sm:p-5">
        <div className="flex items-center justify-between">
          <h1 className=" text-[#4B4F55] flex items-center gap-3">
            Vendors List <DownloadIcon />
          </h1>
          <Input
            Icon={GreySearchIcon}
            placeholder="Search Vendor"
            inputClasses="!bg-[#F9FBFF] !w-[333px] !text-sm"
            onChange={handleSearchChange} 
            value={search}
          />
        </div>
        <div className="mt-5 flex items-center gap-2">
          <h6 className="text-black text-[11px]">Show</h6>
          <ReactDropdown
            placeholder={"Today"}
            options={[5, 10, 25, 50]}
            onChange={handleLimitChange}
            arrowClosed={<KeyboardArrowDownIcon />}
            arrowOpen={<KeyboardArrowDownIcon />}
            controlClassName="!bg-[#F9FBFF] !rounded-[9px] !p-2.5 !text-[#06152B] !placeholder-[#B8B8B8] !text-sm w-[121px]"
            menuClassName="bg-white mt-3  rounded-[6px] text-[#06152B]"
          />
          <h6 className="text-black text-[11px]">entries</h6>
        </div>
        <div className="block mt-6 overflow-x-auto">
          {isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center">
              <Spinner classes={"!w-12 !h-12"} />
            </div>
          ) : (
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
                {vendors?.length > 0 ? (
                  vendors?.map((vendor, index) => (
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
                  ))
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center text-center">
                    <h1 className="text-black font-semibold text-2xl">
                      No Data
                    </h1>
                  </div>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <PaginationOutlined OnChange={handlePageChange} />
      </div>
    </>
  );
};

export default VendorsList;
