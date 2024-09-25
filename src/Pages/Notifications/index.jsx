import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons";

const Notifications = () => {
  return (
    <>
      <div className="sm:w-[652px]  h-[851px] relative  sm:absolute top-10 sm:top-32 o sm:translate-x-0 pt-6 sm:right-24 bg-white  rounded-[21px]  pb-6 ">
        <div
          className="w-0 h-0 
         border-l-[20px] border-l-transparent
         border-t-[35px] border-t-white rotate-180
       border-r-[20px] border-r-transparent absolute  -top-5 right-6"
        ></div>

        <div className="space-y-6 h-[800px] overflow-y-auto sm:hover:overflow-y-auto sm:overflow-hidden">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border-b pb-8 border-b-[#F1F4F9]">
                <div className="flex px-4 items-start gap-3">
                  <img
                    src="/noti.png"
                    alt="avatar"
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div>
                    <h2 className="text-[#333342] text-[13px]">
                      Brian Griffin{" "}
                      <span className="text-[#666C7E] ">
                        wants to collaborate
                      </span>
                    </h2>
                    <p className="text-[#666C7E] text-[11px]">1 hour ago</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
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
    </>
  );
};

export default Notifications;
