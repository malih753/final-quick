import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import { CheckIcon, SaveIcon } from "../../../assets/icons";
import Button from "../../../Common/Button";
import ResponsiveDatePickers from "./components/CustomDatePicker";
import axios from "axios";
import { server } from "../../../Constants/server";
import { enqueueSnackbar } from "notistack";
import Spinner from "../../../Common/Spinner";
const modules = ["User", "Expert", "Vendor"];
const notificationFrequency = ["Daily", "Alternate", "Custom"];

const AddNotification = () => {
  const [formData, setFormData] = useState({
    module: "User",
    content: "Hello",
    isPush: true,
    isDefault: true,
    link: {
      section: "Products",
      page: "Offers",
    },
    notificationFrequency: "Custom",
    frequency: ["2024-10-01"],
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleModulesSelect = (m) => {
    setFormData({ ...formData, module: m });
  };
  const handleNotiFrequencySelect = (n) => {
    setFormData({ ...formData, notificationFrequency: n });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target?.name]: e.target.value,
    });
  };

  const handlePushChange = (e) => {
    setFormData({ ...formData, isPush: e.target.checked });
  };

  const handleDefaultChange = (e) => {
    setFormData({ ...formData, isDefault: e.target.checked });
  };

  console.log(formData.frequency[0].split(","));

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      const res = await axios.post(
        `${server}/notification.add`,
        {
          ...formData,
          frequency: formData.frequency[0].split(","),
        },
        {
          headers: {
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
        }
      );

      console.log(res);
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsSubmit(false);
    }
  };

  console.log(formData);
  return (
    <div className="flex gap-8 items-center flex-wrap md:flex-nowrap ">
      <div className="w-full md:w-[505px] ">
        <h2 className="text-lg text-[#06152B] font-medium mb-2">
          Section & type
        </h2>

        <div className="bg-white h-[500px] px-[10px] sm:px-5 py-[15px] w-full  rounded-[12px]">
          <div className="flex items-center gap-3">
            {modules.map((m) => (
              <Button
                title={m}
                key={m}
                onClick={() => handleModulesSelect(m)}
                btnClass={`border-[#15A9A0] border rounded-[8px] text-[#15A9A0] p-2 text-black duration-300 text-xs ${
                  m === formData.module && "bg-[#15A9A0] text-white "
                }`}
              />
            ))}
          </div>
          <div className="mt-[28px] mb-[15px]">
            <h1 className="text-[#06152B] font-medium">Notification Content</h1>
            <textarea
              className="mt-5 w-full sm:w-[333px] py-2.5 px-[14px] rounded-[10px] bg-[#F1F4FA] text-[#06152B] h-[112px] font-medium text-xs outline-none placeholder:text-[#B8B8B8]"
              placeholder="Enter here"
              onChange={handleChange}
              value={formData.content}
              name={"content"}
            ></textarea>
          </div>

          <div className="mb-[17px] space-y-2 select-none">
            <div className="flex space-x-[6px]  items-center">
              <div className="relative h-4 w-4">
                <input
                  type="checkbox"
                  className="absolute w-full h-full cursor-pointer rounded-md border-[#15A9A0] border focus:ring-0 appearance-none peer"
                  id="push"
                  checked={formData.isPush}
                  onChange={handlePushChange}
                />
                <div className="absolute inset-0 bg-[#15A9A0] rounded-md hidden peer-checked:block transition-opacity duration-200 pointer-events-none"></div>
                <CheckIcon classNames="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block transition-opacity duration-200 pointer-events-none w-4 h-4" />
              </div>

              <label
                className=" text-xs text-[#030229] cursor-pointer"
                htmlFor="push"
              >
                Push Notification
              </label>
            </div>
            <div className="flex space-x-[6px] items-center">
              <div className="relative h-4 w-4">
                <input
                  type="checkbox"
                  className="absolute w-full h-full cursor-pointer rounded-md border-[#15A9A0] border focus:ring-0 appearance-none peer"
                  id="defualt"
                  checked={formData.isDefault}
                  onChange={handleDefaultChange}
                />
                <div className="absolute inset-0 bg-[#15A9A0] rounded-md hidden peer-checked:block transition-opacity duration-200 pointer-events-none"></div>
                <CheckIcon classNames="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block transition-opacity duration-200 pointer-events-none w-4 h-4" />
              </div>

              <label
                className=" text-xs text-[#030229] cursor-pointer"
                htmlFor="defualt"
              >
                Default Notification
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap mb-5">
            <h3 className="text-[#06152B]">Link:</h3>
            <div className="grid grid-cols-2 gap-5 w-full">
              <ReactDropdown
                placeholder={"Select Section"}
                arrowOpen={<KeyboardArrowDownIcon />}
                arrowClosed={<KeyboardArrowDownIcon />}
                options={["Products"]}
                onChange={(e) => {
                  console.log(e);
                  setFormData({
                    ...formData,
                    link: { ...formData.link, section: e.value },
                  });
                }}
                controlClassName="!bg-[#F1F4FA] rounded-[10px] !px-[9px] !py-[8px]  text-[#06152B] text-xs placeholder-[#B8B8B8] "
                menuClassName="bg-white mt-3 min-h-[50px] overflow-y-auto rounded-[6px] p-2 text-[#06152B]"
              />
              <ReactDropdown
                arrowOpen={<KeyboardArrowDownIcon />}
                arrowClosed={<KeyboardArrowDownIcon />}
                options={["Offers"]}
                onChange={(e) => {
                  console.log(e);
                  setFormData({
                    ...formData,
                    link: { ...formData.link, page: e.value },
                  });
                }}
                controlClassName="!bg-[#F1F4FA] rounded-[10px] !px-[9px] !py-[8px]  text-[#06152B] text-xs text-black placeholder-[#B8B8B8] "
                menuClassName="bg-white mt-3 min-h-[50px] overflow-y-auto rounded-[6px] p-2 text-[#06152B] "
              />
            </div>
          </div>
          <div>
            <h1 className="text-[#06152B] font-medium mb-[6px]">
              Notification Frequency
            </h1>
            <div className="flex items-center gap-3">
              {notificationFrequency.map((n) => (
                <Button
                  title={n}
                  key={n}
                  onClick={() => handleNotiFrequencySelect(n)}
                  btnClass={`border-[#15A9A0] border rounded-[8px] text-[#15A9A0] p-2 text-black duration-300 text-xs ${
                    n === formData.notificationFrequency &&
                    "bg-[#15A9A0] text-white "
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Date Picker */}
      <div className="w-full">
        <h2 className="text-lg text-[#06152B] font-medium mb-2">
          Select date & Time
        </h2>
        <div className="bg-white px-[10px] sm:px-5 py-[15px] w-full sm:w-[350px] h-[500px]  rounded-[12px] flex flex-col items-center">
          <ResponsiveDatePickers
            formData={formData}
            setFormData={setFormData}
          />

          <Button
            onClick={handleSubmit}
            btnClass="bg-[#2EDB72] text-white py-3 px-[28px] rounded-[10px] mt-5"
          >
            {isSubmit ? (
              <>
                <Spinner classes={"w-5 h-5"} /> Saving
              </>
            ) : (
              <>
                <SaveIcon />
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNotification;
