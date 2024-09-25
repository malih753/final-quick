import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/icons";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";
import Spinner from "../../Common/Spinner";

const columns = [
  "Date From",
  "Date To",
  "Frequency",
  "Link",
  "Notification content",
];
const PushNotifications = () => {
  const { data, isLoading } = useSWR(`${server}/notification.getAll`, fetcher);

  console.log(data);

  const formatJson = (json) => {
    const formatted = JSON.parse(json);
    console.log("formatted", formatted);
    return JSON.parse(json).page;
  };

  return (
    <div>
      <div className=" overflow-x-auto mt-[15px]   pb-[14px]  min-h-[442px] bg-white lg:mb-[42px]  border-opacity-10">
        <div className="block w-full overflow-x-auto">
          {isLoading ? (
            <div className="w-full h-[442px] flex items-center justify-center">
              <Spinner classes={"w-[70px] h-[70px]"} />
            </div>
          ) : (
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr className="bg-[#A4EAE5]">
                  {columns.map((c) => (
                    <th
                      key={c}
                      className="px-6 text-[#292929]   align-middle   py-3  whitespace-nowrap text-left"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.notifications?.map((noti) => (
                  <tr key={noti.id}>
                    <th className="border-t-0 px-6 align-middle text-[#000] font-medium text-sm  py-5    text-left ">
                      {new Date(noti.dateFrom).toLocaleDateString() ||
                        "30/12/2024"}
                    </th>
                    <td className=" px-6 align-middle  text-sm whitespace-nowrap py-5 text-black ">
                      {new Date(noti.dateTo).toLocaleDateString() ||
                        "30/12/2024"}
                    </td>
                    <td className=" px-6 align-middle  text-sm whitespace-nowrap py-5 text-[#06152B] ">
                      {noti.notificationFrequency}
                    </td>
                    <td className=" px-6 align-middle  text-sm whitespace-nowrap py-5 text-[#06152B] ">
                      <Link to={noti.link}>{formatJson(noti.link)}</Link>
                    </td>
                    <td className="px-6 w-full align-middle text-[10px] sm:text-sm  py-5 justify-between text-[#06152B] flex items-center gap-5">
                      <h6>{noti.content}</h6>
                      <MoreHorizIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
      </div>
    </div>
  );
};

export default PushNotifications;
