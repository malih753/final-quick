import React from "react";
import Button from "../Common/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  PlusIcon,
  SortIcon,
} from "../assets/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LabTestsLayout = () => {
  const navigate = useNavigate();

  const path = useLocation().pathname;

  console.log(path);

  const handleBookingNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <div className="flex flex-wrap w-full relative justify-between gap-5 pb-[23px] border-b border-b-black border-opacity-10">
        <Button
          onClick={() => handleBookingNavigate("/lab-tests/add-lab-test")}
          btnClass="text-black font-poppins text-[#15A9A0]"
        >
          <PlusIcon />
          <span className="text-xs  font-medium font-poppins">Add Test</span>
        </Button>
        <div className="flex flex-wrap  gap-3">
          <Button
            onClick={() =>
              handleBookingNavigate("/lab-tests/bookings")
            }
            btnClass={` font-poppins font-medium px-[19px] py-[11px] ${
              path == "/lab-tests/bookings"
                ? "text-white bg-[#15A9A0]"
                : "text-[#15A9A0] bg-white"
            }`}
            title="Bookings"
          />
          <Button
            btnClass={`font-poppins font-medium px-[19px] py-[11px] mr-[29px] ${
              path == "/lab-tests/packages"
                ? "text-white bg-[#15A9A0]"
                : "text-[#15A9A0] bg-white"
            }`}
            title="Test Packages"
            onClick={() =>
              handleBookingNavigate("/lab-tests/packages")
            }
          />

          {/* <Button btnClass="text-black font-poppins">
            <span className="text-xs font-medium">Filter</span>
            <FilterIcon />
          </Button> */}
          <Button btnClass="text-black font-poppins">
            <span className="text-xs font-medium">Sort</span>
            <SortIcon />
          </Button>
        </div>
      </div>
      <Outlet />
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

export default LabTestsLayout;
