import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import Input from "../../Common/Input";
import { FilterIcon, GreySearchIcon } from "../../assets/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactDropdown from "react-dropdown";
import useSWR from "swr";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";

const buttons = ["All", "New Prescriptions"];
const columns = [
  "Customer Name",
  "Number",
  "Prescription",
  "Order Details",
  "Status",
];
const Prescriptions = () => {
  const [active, setActive] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (button) => {
    setActive(button);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {};

  const { data, error, isLoading } = useSWR(
    `${server}/priscriptions.get`,
    fetcher
  );

  console.log(data);

  useEffect(() => {
    if (active === "All") {
      setPrescriptions(data?.priscriptions);
    } else if (active === "New Prescriptions") {
      const newPrescriptions = data?.data?.filter((prescription) => {
        return new Date(prescription.createdAt) > new Date();
      });
      setPrescriptions(newPrescriptions);
    }

    if (search && data) {
      const filteredPrescriptions = data?.data?.filter((prescription) => {
        return prescription.name.toLowerCase().includes(search.toLowerCase());
      });
      setPrescriptions(filteredPrescriptions);
    } else {
      setPrescriptions(data?.data);
    }
  }, [search, active]);

  return (
    <div className="bg-white bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-6 p-[10px]">
      <h3 className="text-lg text-black">All Prescriptions (12,345)</h3>

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

      <div className="block w-full overflow-x-auto rounded-[14px] bg-white">
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr className="bg-[#15A9A0]">
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-6 opacity-60 text-white   align-middle   py-3  whitespace-nowrap text-left"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prescriptions?.map((prescription, index) => (
              <tr
                onClick={handleNavigate}
                key={index}
                className={` ${index % 2 ? "bg-[#E8E8E8]" : ""}`}
              >
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#15A9A0]   py-5 text-left ">
                  {prescription.name}
                </td>
                <td className="border-t-0 px-6 align-middle whitespace-nowrap text-[#404040]   py-5 text-left ">
                  +{prescription.phoneNumberToConfirmOrder}
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#15A9A0]  underline py-5 text-left ">
                  View Prescription
                </td>
                <td className="border-t-0 whitespace-nowrap px-6 align-middle text-[#15A9A0]  underline py-5 text-left ">
                  View Details
                </td>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle  py-5 text-left flex items-center justify-between">
                  <ReactDropdown
                    options={[prescription.status]}
                    placeholder="Pending"
                    controlClassName={`!rounded-full !py-[7px] !px-[10px]  !text-white !w-[100px] ${
                      prescription.status === "pending"
                        ? "!bg-[#34A853]"
                        : "!bg-[#F22222]"
                    }`}
                    arrowOpen={
                      <div
                        className="w-0 h-0 
               border-l-[4px] border-l-transparent
               border-t-[6px] border-t-white
             border-r-[4px] border-r-transparent "
                      ></div>
                    }
                    arrowClosed={
                      <div
                        className="w-0 h-0 
                        border-l-[4px] border-l-transparent
                        border-t-[6px] border-t-white
                        border-r-[4px] border-r-transparent "
                      ></div>
                    }
                  />
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

export default Prescriptions;
