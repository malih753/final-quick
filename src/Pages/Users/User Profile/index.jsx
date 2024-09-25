import React from "react";
import Input from "../../../Common/Input";
import UserOrders from "./UserOrders";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { server } from "../../../Constants/server";
import { fetcher } from "../../../utils/fetcher";

const UserProfile = () => {
  const params = useParams();

  const { data, isLoading } = useSWR(
    `${server}/users.details/${params.id}`,
    fetcher
  );

  console.log(data);
  return (
    <div className="bg-white bg-opacity-60 min-h-[965px] rounded-[16px] sm:rounded-[31px] sm:p-5 p-[10px] my-2">
      <div className="flex flex-wrap gap-4 pb-[18px] mb-[18px] border-b-[0.92px] border-b-[#CACACA]">
        <div>
          <h2 className="text-sm text-[#06152B] font-medium mb-[13px]">
            Profile Picture
          </h2>
          <img
            src="/profile.png"
            alt="profile"
            className="rounded-[9.26px] object-cover w-[150px] h-[150px] sm:w-[224px] sm:h-[224px]"
          />
        </div>
        <div className="sm:ml-2 space-y-4 sm:w-fit w-full">
          <Input
            label={"User name"}
            placeholder={"User name"}
            value={data?.users?.name}
            disabled
          />
          <Input
            label={"Phone Number"}
            placeholder={"77385 40986"}
            value={data?.users?.phone}
            disabled
          />
        </div>
        <div className="w-full sm:w-fit">
          <Input
            label={"Email"}
            placeholder={"Johndoe@gmail.com"}
            value={data?.users?.email || "example@gmail.com"}
            disabled
          />
        </div>
      </div>

      <UserOrders phone={data?.users?.phone} />
    </div>
  );
};

export default UserProfile;
