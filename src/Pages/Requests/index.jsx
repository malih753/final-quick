import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { server } from "../../Constants/server";
import { FilterIcon, GreySearchIcon } from "../../assets/icons";
import { fetcher } from "../../utils/fetcher";

const buttons = ["All", "New", "Old to New"];
const columns = [
  "User Name",
  "Email",
  "Prescription",
  "Medicine Name",
  "Company Name",
  "Qty",
  "Received on",
];
const Requests = () => {
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  const handleClick = (button) => {
    setActive(button);
  };

  const { data } = useSWR(`${server}/medicineRequest`, fetcher);

  console.log(data);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (active === "All") {
      setFilteredRequests(data?.medicineRequests);
    } else if (active === "New") {
      const newFilteredRequests = data?.medicineRequests?.filter((request) => {
        return new Date(request.createdAt) > new Date();
      });
      setFilteredRequests(newFilteredRequests);
    } else if (active === "Old to New") {
      const oldFilteredRequests = data?.medicineRequests?.filter((request) => {
        return new Date(request.createdAt) < new Date();
      });
      setFilteredRequests(oldFilteredRequests);
    }

    if (search && data) {
      const filteredRequests = data?.medicineRequests?.filter((request) => {
        return request.medicineName
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredRequests(filteredRequests);
    } else {
      setFilteredRequests(data?.medicineRequests);
    }
  }, [active, data, search]);

  return (
    <div className="bg-white w-full bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <h3 className="text-lg text-black">Total Questions (12,345)</h3>

      <div className="flex items-center flex-wrap justify-between gap-4 py-5">
        <div className="flex items-center gap-2 rounded-full bg-[#F3F2F2] px-2 py-[6px]">
          {buttons.map((button) => (
            <Button
              onClick={() => handleClick(button)}
              key={button}
              title={button}
              btnClass={`py-[7px] px-2.5  ${
                active == button ? "bg-[#15A9A0] text-white" : "text-[#8A8A8A]"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-[14px]">
          <Input
            Icon={GreySearchIcon}
            placeholder="Search"
            iconClasses="left-2"
            inputClasses="pl-9 border rounded-[6px] py-[7px] border-[#00000021]"
            onChange={handleSearchChange}
            value={search}
          />
          {/* <Button btnClass="text-black py-[7px] px-[11px] border rounded-[6px] border-[#00000021]">
            <div className="flex items-center gap-2 opacity-30 ">
              <FilterIcon />
              <span className="text-xs font-medium">Filters</span>
            </div>
          </Button> */}
        </div>
      </div>

      <div className="overflow-hidden hover:overflow-x-auto lg:w-[1000px] rounded-[14px] bg-white">
        <table className="items-center  bg-transparent border-collapse ">
          <thead>
            <tr className="bg-[#15A9A0] w-full">
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-6 opacity-60  text-white   align-middle   py-3  whitespace-nowrap  text-left"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.map((q, index) => (
              <tr key={q.id}>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                  Talha Anjum
                </td>
                <td className="border-t-0 px-6 align-middle whitespace-nowrap text-[#404040]   py-5 text-left ">
                  Talha123@gmail.com
                </td>

                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0] underline  py-5 text-left ">
                  View Photo
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]   py-5 text-left ">
                  {q.medicineName}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]   py-5 text-left ">
                  {q.companyName}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040]   py-5 text-left ">
                  {q.qty}
                </td>

                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#404040] flex items-center justify-between text-xs py-5 text-left ">
                  {new Date(q.createdAt).toLocaleDateString()}
                  <MoreVertIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center flex-col justify-center my-5 gap-3">
        <p className=" text-[9.22px] text-black">
          Showing 1 to 10 of 10 entries
        </p>
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
        />
      </div>
    </div>
  );
};

export default Requests;
