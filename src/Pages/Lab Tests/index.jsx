import React from "react";
import Button from "../../Common/Button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FilterIcon,
  PlusIcon,
  SortIcon,
} from "../../assets/icons";
import useSWR from "swr";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";

const columns = ["Test name", "Price", "Gender", "Action"];

const LabTests = () => {
  const { data, error } = useSWR(`${server}/labTest.get`, fetcher);

  console.log(data);
  return (
    <div>
      <div className="mt-8 w-full p-5 pt-0 rounded-[9.17px] bg-white">
        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-spacing-y-2.5 border-separate table-auto ">
            <thead>
              <tr className="">
                {columns.map((c) => (
                  <th
                    key={c}
                    className={`px-6 text-[#06152B] opacity-70 text-[11.55px]  align-middle   pt-1 pb-3 whitespace-nowrap ${
                      c == "Test name" || c == "Action"
                        ? "text-center"
                        : "text-left"
                    } `}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.labTests?.map((c) => (
                <tr key={c.id} className="bg-[#F1F4FA]">
                  <td className="border-t-0 px-6 align-middle text-[#06152B]    text-[13px]  rounded-l-[9.14px] py-[10px] overflow-hidden text-left ">
                    <div className="flex items-center gap-6">
                      <img
                        src={`${server}${c.coverImage}`}
                        // src="/lab.png"
                        className="w-16 h-16 object-cover rounded-[10px]"
                        alt="image"
                      />
                      <h2 className="w-[247px] text-black text-sm">
                        {c.testName}
                      </h2>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle text-[#06152B] text-[12.9px] font-poppins  py-[17px] text-left ">
                    ₹ {c.sellingPrice}
                  </td>
                  <td className="border-t-0 px-6 align-middle text-[#06152B] text-[12.9px] font-poppins  py-[17px] text-left ">
                    {c.recommendedFor}
                  </td>

                  <td
                    className={`border-t-0 px-6 align-middle text-[#2EDB72]  rounded-r-[9.14px] py-[17px] text-left`}
                  >
                    <div className="flex items-center gap-2 justify-center">
                      <Button
                        title="Delete"
                        btnClass="text-white font-poppins font-medium py-[7.37px] text-[12.9px] px-[11.05px] bg-[#15A9A0] rounded-[7.37px]"
                      />
                      <span className="text-[#15A9A0] underline text-[12.9px] font-medium">
                        Edit
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabTests;
