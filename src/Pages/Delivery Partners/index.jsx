import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import React, { useCallback, useState } from "react";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { FilterIcon, GreySearchIcon } from "../../assets/icons";
import DocumentsPopover from "./components/DocumentsPopover";
import useSWR from "swr";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";

const buttons = ["All", "New", "Old to New"];
const columns = ["Name", "Phone Number", "Address", "Status", "Profile"];
const DeliveryPartners = () => {
  const [active, setActive] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [queries, setQueries] = useState({
    name: "",
    sortBy: 1,
    page: 1,
    limit: 10,
  });

  const handleClick = (button) => {
    setActive(button);
  };

  const checkUrlBase = useCallback(() => {
    let url = `/deliveryPartner.getAll?page=${queries.page}&limit=${queries.limit}`;
    if (queries.name) {
      url += `&name=${queries.name}`;
    }
    // if (queries.sortBy) {
    //   url += `&sortBy=${queries.sortBy}`;
    // }

    console.log(url);
    return url;
  }, [queries]);

  const handleSearch = (e) => {
    setQueries({ ...queries, name: e.target.value });
  };

  const { data } = useSWR(`${server}${checkUrlBase()}`, fetcher);

  console.log(data);

  // const handlePageChange = (value) => {
  //   console.log(value);
  //   setQueries({ ...queries, page: value });
  // };
  const handlePageChange = (e) => {
    console.log(e);
    if (e.target.innerText) {
      setQueries({ ...queries, page: e.target.innerText });
    } else if (e.target.getAttribute("data-testid") === "NavigateNextIcon") {
      console.log("next tk agya");
      setQueries({ ...queries, page: queries.page + 1 });
    } else if (e.target.getAttribute("data-testid") === "NavigateBeforeIcon") {
      console.log("previous tk agya");
      setQueries({ ...queries, page: queries.page - 1 });
    }
  };

  return (
    <div className="bg-white w-full bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-black">
          {isJoining
            ? "Joining Request and verification (23)"
            : "Delivery Partners (12,345)"}
        </h3>

        <h6
          onClick={() => setIsJoining(!isJoining)}
          className="text-[#15A9A0] text-sm sm:text-lg cursor-pointer select-none"
        >
          Joining Requests
        </h6>
      </div>

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
            onChange={handleSearch}
            value={queries.name}
          />
          <Button btnClass="text-black py-[7px] px-[11px] border rounded-[6px] border-[#00000021]">
            <div className="flex items-center gap-2 opacity-30 ">
              <FilterIcon />
              <span className="text-xs font-medium">Filters</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-[14px] bg-white">
        <table className="items-center w-full bg-transparent border-collapse ">
          <thead>
            <tr className="bg-[#15A9A0]">
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
            {data?.deliveryPartners?.map((q, index) => (
              <tr key={q.id}>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                  {q.firstName + " " + q.lastName}
                </td>

                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                  +{q.phoneNumber}
                </td>
                <td className="border-t-0 w-[200px] px-6 align-middle text-[#404040] text-xs  py-5 text-left ">
                  {q.address}
                </td>

                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5  ">
                  {isJoining ? (
                    <Button
                      title={q.status}
                      btnClass="text-white bg-[#F26522] py-2 px-[15px]"
                    />
                  ) : (
                    <Button
                      title={q.status}
                      btnClass={`text-white ${
                        q.status === "Active" ? "bg-[#15A9A0]" : "bg-[#F26522]"
                      }`}
                    />
                  )}
                </td>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0] underline py-5 text-left ">
                  {isJoining ? <DocumentsPopover /> : " View Profile"}
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
          count={data?.total}
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
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DeliveryPartners;
