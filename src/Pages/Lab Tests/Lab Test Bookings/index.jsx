import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const columns = ["User name", "Number", "Test name", "Price", "Address"];

const LabTestBookings = () => {
  return (
    <div>
      <div className="mt-8 w-full p-5 pt-0 rounded-[9.17px] bg-white">
        <div className="block  overflow-x-auto">
          <table className="items-center w-full bg-transparent  border-spacing-y-2.5 border-separate table-auto ">
            <thead>
              <tr className="">
                {columns.map((c) => (
                  <th
                    key={c}
                    className={`px-6 text-[#4D5869]  text-[11.55px]  align-middle font-medium  pt-1 pb-3 whitespace-nowrap ${
                      c == "User name" ? "text-left pl-10" : "text-center"
                    } `}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {
              [1,2,3,4,5].map((c) => (
                <tr key={c} className="bg-[#F1F4FA]">
                <td className="border-t-0 pl-10 whitespace-nowrap px-6 align-middle text-black text-sm rounded-l-[9.14px] py-6  text-left ">
                  Talha Anjum
                </td>
                <td className="border-t-0 px-6 whitespace-nowrap align-middle text-[#404040]   py-6 overflow-hidden text-center ">
                  +91 384 384 82 43
                </td>

                <td className="border-t-0 px-6 align-middle text-[#06152B]  text-[13px] py-[10px]  text-left ">
                  <div className="flex items-center gap-6">
                    <img
                      src={"/lab.png"}
                      className="w-16 h-16 object-cover rounded-[10px]"
                      alt="image"
                    />
                    <h2 className="w-[247px] text-black text-sm">
                      Comprehensive gold full body checkup with smart report
                    </h2>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle text-[#06152B] text-[12.9px] whitespace-nowrap font-poppins py-6  text-center ">
                  ₹ 500
                </td>
                <td className="border-t-0  px-6 align-middle text-black flex items-center justify-between text-xs font-poppins py-6  text-left ">
                  {/* <div> */}
                  <h6>2nd Floor Room no 8, Sainiwas CHS, Near T.M.C Office</h6>
                  <MoreHorizIcon sx={{ color: "#030229" }} />
                  {/* </div> */}
                </td>
              </tr>
              ))
            }
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabTestBookings;
