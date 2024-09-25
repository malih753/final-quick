import React from "react";
import Input from "../../../../Common/Input";
import { BriefCaseIcon, BuildingIcon, HomeIcon } from "../../../../assets/icons";
const AddressInfo = () => {
  return (
    <div className="min-h-[850px] ">
      <h1 className="text-[24px] text-[#15A9A0] sm:pl-8">
        Add Customer Information
      </h1>

      <form className="mt-[44px] flex-wrap flex gap-5 sm:gap-16">
        <div className="space-y-6 sm:w-[394px]">
          <Input
            placeholder={"Full name (Required)*"}
            inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow"
            required
          />
          <Input
            placeholder={"Phone number (Required)*"}
            inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow"
            required
          />
          <Input
            placeholder={"Zipcode (Required)*"}
            inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow"
            required
          />
        </div>
        <div className="space-y-6 sm:w-[394px]">
          <div className="flex flex-wrap sm:ml-4 gap-3">
            <Input
              placeholder={"State (Required)*"}
              inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow"
              required
            />
            <Input
              placeholder={"City (Required)*"}
              inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow"
              required
            />
          </div>

          <Input
            placeholder={"Full Address*"}
            inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow sm:ml-4"
            required
          />
          <Input
            placeholder={"Unit number (only for apartments)"}
            inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 py-5 sm:pl-10 shadow-input-shadow sm:ml-4"
            required
          />
          <div>
            <Input
              placeholder={"Type of address"}
              inputClasses="placeholder:text-[#3E494F] placeholder:opacity-40 text-sm py-5 sm:pl-10 shadow-input-shadow"
              required
            />
            <div className="flex items-center pl-3 sm:pl-10 gap-6 mt-3 sm:mt-[34px]">
              <div className="flex items-center gap-1">
                <HomeIcon />
                <h4 className="text-[#B0B4B6] text-xs">Home</h4>
              </div>
              <div className="flex items-center gap-1">
              <BuildingIcon />
                <h4 className="text-[#B0B4B6] text-xs">Apartments</h4>
              </div>
              <div className="flex items-center gap-1">
                <BriefCaseIcon />
                <h4 className="text-[#B0B4B6] text-xs">Work</h4>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressInfo;
