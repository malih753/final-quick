import React, { useState } from "react";
import Input from "../../../Common/Input";
import { CalenderIcon, CheckIcon } from "../../../assets/icons";
import axios from "axios";
import { server } from "../../../Constants/server";
import Button from "../../../Common/Button";
import Spinner from "../../../Common/Spinner";
import { enqueueSnackbar } from "notistack";

const AddCoupons = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    couponCode: "",
    description: "",
    limitPerUser: "",
    cartValue: "",
    discountValue: "",
    startDateTime: "", //yyyy-MM-dd hh:mm - 24h
    endDateTime: "", //yyyy-MM-dd hh:mm - 24h
  });

  const [DateTime, setDateTime] = useState({
    startTime: "01:00",
    startDate: "",
    endDate: "",
    endTime: "01:00",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setDateTime({
      ...DateTime,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateRandomCode = () => {
    setFormData({
      ...formData,
      couponCode: Math.random().toString(36).substring(7).toUpperCase(),
    });
  };

  const handleSubmit = async () => {
    setIsSubmit(true);
    try {
      const startDateTime = `${DateTime.startDate} ${DateTime.startTime}`;
      const endDateTime = `${DateTime.endDate} ${DateTime.endTime}`;
      console.log(startDateTime, endDateTime);
      const res = await axios.post(
        `${server}/coupon.add`,
        {
          ...formData,
          startDateTime,
          endDateTime,
        },
        {
          headers: {
            "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          },
        }
      );

      console.log(res);
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="w-full border-t border-t-black border-opacity-10  pt-8">
      <div className="px-[10px] sm:px-[25px] py-8 bg-white rounded-[10px] sm:rounded-[32px] lg:h-[652px]">
        <h1 className="text-[#15A9A0] font-semibold text-lg">Add Coupon</h1>
        <form onSubmit={handleSubmit}>
          <div className="pl-0 sm:pl-4 ">
            <div className="mt-8 sm:grid-cols-2 grid-cols-1   gap-4 sm:gap-[36px] grid">
              <Input
                required
                label={"Discount Code"}
                placeholder={"Enter Coupon Name"}
                inputClasses="!bg-[#F1F4FA] text-sm placeholder:text-[#515B6B]"
                labelRightText="Generate random code"
                generateRandom={handleGenerateRandomCode}
                onChange={handleChange}
                name={"couponCode"}
                value={formData.couponCode}
              />
              <Input
              required
                name={"description"}
                onChange={handleChange}
                value={formData.description}
                label={"Coupon description"}
                placeholder={"Write coupon descriotion"}
                inputClasses="!bg-[#F1F4FA] text-sm placeholder:text-[#515B6B]"
              />
            </div>
            <h5 className="mt-1  text-sm text-[#B4B4B4]">
              Customer must enter this code at checkout
            </h5>

            <div className="grid-cols-1 grid sm:flex flex-wrap items-start sm:gap-16 gap-6 mt-[23px]">
              <div>
                <h3 className="text-[#06152B] font-medium mb-2.5">
                  Maximum discount uses
                </h3>
                <div className="rounded-[10px] space-y-2 bg-[#F1F4FA] px-[33px] pl-3 py-[11px] select-none">
                  <div className="flex  space-x-[6px]  items-center">
                    <div className="relative h-4 w-4">
                      <input
                      
                        type="checkbox"
                        className="absolute w-full h-full cursor-pointer rounded-md border-[#15A9A0] border focus:ring-0 appearance-none peer"
                        id="push"
                      />
                      <div className="absolute inset-0 bg-[#15A9A0] rounded-md hidden peer-checked:block transition-opacity duration-200 pointer-events-none"></div>
                      <CheckIcon classNames="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block transition-opacity duration-200 pointer-events-none w-4 h-4" />
                    </div>

                    <label
                      className=" text-xs text-[#030229] cursor-pointer"
                      htmlFor="push"
                    >
                      Limit number of times this discount can be used in total
                    </label>
                  </div>
                  <div className="flex space-x-[6px] items-center">
                    <div className="relative h-4 w-4">
                      <input
                        type="checkbox"
                        className="absolute w-full h-full cursor-pointer rounded-md border-[#15A9A0] border focus:ring-0 appearance-none peer"
                        id="defualt"
                        checked={formData.limitPerUser === 1}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            limitPerUser: formData.limitPerUser === 1 ? "" : 1,
                          })
                        }
                      />
                      <div className="absolute inset-0 bg-[#15A9A0] rounded-md hidden peer-checked:block transition-opacity duration-200 pointer-events-none"></div>
                      <CheckIcon classNames="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block transition-opacity duration-200 pointer-events-none w-4 h-4" />
                    </div>

                    <label
                      className=" text-xs text-[#030229] cursor-pointer"
                      htmlFor="defualt"
                    >
                      Limit to one use per user
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:flex gap-4">
                <Input
                  label={"Cart value"}
                  required
                  value={formData.cartValue}
                  onChange={handleChange}
                  name={"cartValue"}
                  placeholder={"10"}
                  inputClasses="!bg-[#F1F4FA] text-sm placeholder:text-[#515B6B]"
                />
                <Input
                
                  onChange={handleChange}
                  name={"discountValue"}
                  value={formData.discountValue}
                  label={"Discount value"}
                  placeholder={"10"}
                  inputClasses="!bg-[#F1F4FA] text-sm placeholder:text-[#515B6B]"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-[#06152B] font-medium">Active dates</h1>

              <div className="grid grid-cols-1 sm:flex flex-wrap items-center mt-5 gap-4">
                <Input
                  label={"Start date"}
                  placeholder={"-- Input -- "}
                  inputClasses="!bg-[#F1F4FA] appearance-none text-sm placeholder:text-[#515B6B] pl-10 relative"
                  lableClasses="text-sm"
                  iconClasses="left-3"
                  Icon={CalenderIcon}
                  type="date"
                  onChange={handleDateChange}
                  value={DateTime.startDate}
                  min={new Date().toISOString().split("T")[0]}
                  name="startDate"
                  required
                />
                <Input
                required
                  label={"Start time (IST)"}
                  placeholder={"Enter time"}
                  inputClasses="!bg-[#F1F4FA] w-[189px] text-sm placeholder:text-[#515B6B]"
                  lableClasses="text-sm"
                  type="time"
                  onChange={handleDateChange}
                  value={DateTime.startTime}
                  name="startTime"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-[5px]">
                  <span className="w-4 h-4 bg-[#15A9A0] rounded"></span>
                  <h3 className=" text-sm text-[#030229]">Set end date</h3>
                </div>
                <div className="grid grid-cols-1 sm:flex mt-[6px] flex-wrap items-center  gap-4">
                  <Input
                    min={new Date().toISOString().split("T")[0]}
                    label={"Start date"}
                    placeholder={"-- Input -- "}
                    inputClasses="!bg-[#F1F4FA] appearance-none text-sm placeholder:text-[#515B6B] pl-10 relative"
                    lableClasses="text-sm"
                    iconClasses="left-3"
                    Icon={CalenderIcon}
                    type="date"
                    onChange={handleDateChange}
                    value={DateTime.endDate}
                    name="endDate"
                    required
                  />
                  <Input
                    label={"Start time (IST)"}
                    placeholder={"Enter time"}
                    inputClasses="!bg-[#F1F4FA] w-[189px] text-sm placeholder:text-[#515B6B]"
                    lableClasses="text-sm"
                    type="time"
                    onChange={handleDateChange}
                    value={DateTime.endTime}
                    name="endTime"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mr-5 flex justify-end">
            <Button
              disabled={isSubmit}
              title={
                isSubmit ? (
                  <>
                    <Spinner classes={"w-4 h-4"} /> Saving...
                  </>
                ) : (
                  "Save"
                )
              }
              type="submit"
              btnClass="bg-[#15A9A0] text-white py-2.5 sm:px-[35px] px-4 hover:bg-transparent border border-[#15A9A0] hover:text-[#15A9A0] duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupons;
