import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { GreySearchIcon, DownloadIcon } from "../../../assets/icons";
import Input from "../../../Common/Input";
import Button from "../../../Common/Button";
import { Pagination } from "@mui/material";
import { fetcher } from "../../../utils/fetcher";
import { server } from "../../../Constants/server";
import useSWR from "swr";

const columns = [
  "Order ID",
  "Item",
  "Customer Name",
  "Date",
  "Payment Info",
  "Price",
  "Status",
];

const butotns = ["Ongoing orders", "Completed orders"];
const UserOrders = ({ phone }) => {
  const [activeButton, setActiveButton] = useState("");
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const { data, isLoading } = useSWR(
    `${server}/orders.ofuser.byphone/${phone}`,
    fetcher
  );

  console.log(data);
  return (
    <div className="bg-white rounded-[14.7px] lg:w-[1000px] p-[10px] sm:p-5">
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <h1 className=" text-[#4B4F55] flex items-center gap-3">
          Vendors List <DownloadIcon />
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          {butotns.map((button) => (
            <Button
              onClick={() => handleButtonClick(button)}
              key={button}
              title={button}
              btnClass={`py-[7px] px-[9.18px] text-[11px] rounded-[9.18px]  ${
                activeButton == button
                  ? "bg-[#15A9A0] text-white"
                  : "text-[#8A8A8A] bg-[#F1F4FA] text-black"
              }`}
            />
          ))}
          <Input
            Icon={GreySearchIcon}
            placeholder="Search order ID"
            iconClasses="left-2"
            inputClasses="!bg-[#F1F4FA] py-[10px] !w-[198px] !text-xs pl-9 placeholder:text-[#B5B7C0]"
            classes="order-[-1] sm:order-1"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <h6 className="text-black text-[11px]">Show</h6>
        <ReactDropdown
          placeholder={"Today"}
          options={[5]}
          arrowClosed={<KeyboardArrowDownIcon />}
          arrowOpen={<KeyboardArrowDownIcon />}
          controlClassName="!bg-[#F9FBFF] !rounded-[9px] !p-2.5 !text-[#06152B] !placeholder-[#B8B8B8] !text-sm w-[121px]"
          menuClassName="bg-white mt-3  rounded-[6px] text-[#06152B]"
        />
        <h6 className="text-black text-[11px]">entries</h6>
      </div>
      <div className=" mt-6 hover:overflow-x-scroll overflow-hidden ">
        <table className="items-center w-[1100px]  bg-transparent  border-spacing-y-2.5 border-separate table-auto ">
          <thead>
            <tr className="">
              {columns.map((c) => (
                <th
                  key={c}
                  className={`px-6 text-[#06152B]  text-[11.66px]  align-middle font-medium  pt-1 pb-3 text-left whitespace-nowrap opacity-70 ${
                    c == "Item" ? "text-center" : ""
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.orders?.length > 0 &&
              data?.orders.map((item, index) => (
                <tr key={item.id} className="bg-[#F1F4FA]">
                  <td className="border-t-0 pl-8 whitespace-nowrap px-6 align-middle text-[#06152B] text-[12.86px] rounded-l-[9.14px] py-5  text-left ">
                   {item.orderId}
                  </td>
                  <td className="  px-4 align-middle text-[#06152B] text-[12px] py-5  text-left flex items-center gap-6 ">
                    <div className="bg-white w-14 h-14 rounded p-1">
                      <img
                        // src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        src="/bottle.png"
                        alt="img"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <h6 className="w-[230px]">
                      MuscleBlaze Biozyme Performance Whey, 2 kg (4.4 lb) Rich
                      Chocolate
                    </h6>
                  </td>

                  <td className=" whitespace-nowrap px-6 align-middle text-[#06152B] text-[12.86px] py-5  text-left ">
                    Mayur kamble
                  </td>
                  <td className=" whitespace-nowrap px-6 align-middle text-[#06152B] text-[12.86px] py-5  ">
                   {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className=" whitespace-nowrap px-6 align-middle text-[#06152B] text-[12.86px] py-5  text-left ">
                    Debit Card
                  </td>
                  <td className=" whitespace-nowrap px-6 align-middle text-[#06152B] text-[12.86px] py-5  text-left ">
                    ₹ {item.amount}
                  </td>

                  <td
                    className={` whitespace-nowrap px-6 align-middle  text-[12.86px] py-5 rounded-r-[9.14px] text-left text-[#FB5458]`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center my-5 flex-col gap-3">
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
    </div>
  );
};

export default UserOrders;
