import React from "react";
import Button from "../../../Common/Button";
import OrderProgressBar from "./Order Progress Bar/OrderProgressBar";
import { useParams } from "react-router-dom";
import { server } from "../../../Constants/server";
import { fetcher } from "../../../utils/fetcher";
import useSWR from "swr";

const OrderDetails = () => {
  const params = useParams();

  console.log(params.id);
  const { data, isLoading } = useSWR(
    `${server}/adminOrder/${params.id}`,
    fetcher
  );

  console.log(data);
  return (
    <div className="min-h-[300vh] sm:min-h-[260vh]">
      <div className="  min-h-[600px]  sm:pl-[22px] pb-[33px] pt-[26px] sm:pr-[15px] px-[10px] rounded-[5px]  bg-white ">
        <div className="flex justify-between flex-wrap gap-2.5">
          <div>
            <h2 className="text-[#06152B] font-semibold">Vendor info</h2>
            <div className="w-[250px] h-[150px] shadow-order-detail-shadow mt-2.5 rounded-[13.69px] pt-[10px] pl-[17px] pb-4">
              <h1 className="font-medium text-[#06152B] text-sm">
                Muscleblaze
              </h1>
              <p className="text-sm text-[#A0AEC0] mt-2 mb-[6px]">
                2nd Floor Room no 8, Sai Niwas CHS, Near T.M.C Office, Majiwada,
                Thane (W)
              </p>
              <h6 className="text-sm font-medium text-[#A0AEC0]">
                +91 7738542976
              </h6>
            </div>
          </div>
          <div>
            <h2 className="text-[#06152B] font-semibold">Customer</h2>
            <div className="w-[250px] h-[150px] shadow-order-detail-shadow mt-2.5 rounded-[13.69px] pt-[10px] pl-[17px] pb-4">
              <h1 className="font-medium text-[#06152B] text-sm">
                Muzammil Khan
              </h1>
              <p className="text-sm text-[#A0AEC0] mt-2 mb-[6px]">
                2nd Floor Room no 8, Sai Niwas CHS, Near T.M.C Office, Majiwada,
                Thane (W)
              </p>
              <h6 className="text-sm font-medium text-[#A0AEC0]">
                +91 7738542976
              </h6>
            </div>
          </div>
          <div>
            <h2 className="text-[#06152B] font-semibold">Deliver to</h2>
            <div className="w-[250px] h-[150px] shadow-order-detail-shadow mt-2.5 rounded-[13.69px] pt-[10px] pl-[17px] pb-4">
              <h1 className="font-medium text-[#06152B] text-sm">
                Muzammil Khan
              </h1>
              <p className="text-sm text-[#A0AEC0] mt-2 mb-[6px]">
                2nd Floor Room no 8, Sai Niwas CHS, Near T.M.C Office, Majiwada,
                Thane (W)
              </p>
              <h6 className="text-sm font-medium text-[#A0AEC0]">
                +91 7738542976
              </h6>
            </div>
          </div>
          <div>
            <div className="w-[200px] h-[80px] mt-2.5 ">
              <h2 className="text-[#06152B] font-semibold">Payment method</h2>
              <div className="shadow-order-detail-shadow mt-2.5 rounded-[13.69px] pt-[11px]  pb-[13px] pl-[15px]">
                <h6 className="text-sm font-medium text-[#06152B] ">
                  Cash On Delivery
                </h6>
              </div>
            </div>
            <div className="w-[200px] h-[80px] mt-2.5 ">
              <h2 className="text-[#06152B] font-semibold">Order date</h2>
              <div className="shadow-order-detail-shadow mt-2.5 rounded-[13.69px] pt-[11px]  pb-[13px] pl-[15px]">
                <h6 className="text-sm text-[#A0AEC0] ">
                  4:34 PM, Wed, Aug 13, 2020
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="my-[14px] px-2.5 sm:px-[21px] pt-[17px] w-full min-h-[336.73px] rounded-[14.6px] shadow-order-detail-shadow pb-[29px]">
          <h1 className="font-medium text-[#4B4F55] mb-[25px]">
            Order Summary
          </h1>

          <div className="w-full overflow-x-auto ">
            <table
              className="table-auto border-separate w-full"
              style={{ borderSpacing: "0 14px" }}
            >
              <thead className="table-text">
                <tr>
                  <th className=" pr-5 whitespace-nowrap">
                    <h6 className="font-medium text-[10.95px] text-[#4D5869] text-left pl-[10px] sm:pl-10">
                      #
                    </h6>
                  </th>
                  <th className=" pr-5 whitespace-nowrap">
                    <h6 className="font-medium text-[10.95px] text-[#4D5869] text-center pl-[10px]">
                      Item
                    </h6>
                  </th>

                  <th className=" pr-5 whitespace-nowrap">
                    <h6 className="font-medium text-[10.95px] text-[#4D5869] text-center pl-[10px] ">
                      Tracking ID
                    </h6>
                  </th>
                  <th className=" pr-5 whitespace-nowrap">
                    <h6 className="font-medium text-[10.95px] text-[#4D5869] text-center pl-[10px] ">
                      Quantity
                    </h6>
                  </th>
                  <th className=" pr-5 whitespace-nowrap">
                    <h6 className="font-medium text-[10.95px] text-[#4D5869] text-center pl-[10px]">
                      Price
                    </h6>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data?.adminOrder?.products?.map((product, index) => (
                  <tr key={product.id} className="bg-[#F1F4FA]">
                    <th className="pl-10 align-middle   whitespace-nowrap p-3 text-left  rounded-l-[12.78px]">
                      <h6 className="text-[#06152B]  text-xs">{index + 1}</h6>
                    </th>
                    <th className="  align-middle p-3 text-left flex items-center gap-5">
                      <div className="w-[56px] h-[56px] bg-white flex items-center justify-center overflow-hidden px-[5px]  rounded-[3.65px]">
                        <img src="/bottle.png" alt="bottle" />
                      </div>
                      <h6
                        className="text-[#06152B] text-xs w-[225px]
                    "
                      >
                        {product?.productName}
                      </h6>
                    </th>

                    <th className="  align-middle   whitespace-nowrap p-3 text-center">
                      <h6 className="text-[#06152B] text-xs">123456789123</h6>
                    </th>
                    <th className=" align-middle   whitespace-nowrap p-3 text-center">
                      <h6 className="text-[#06152B] text-xs">1</h6>
                    </th>
                    <th className="rounded-r-[12.78px] align-middle   whitespace-nowrap p-3 text-center">
                      <h6 className="text-[#06152B] text-xs">
                        ₹ {product?.sellingPrice}
                      </h6>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex-wrap gap-4 mt-4 flex justify-between items-center">
            <Button
              title="Print Invoice"
              btnClass="text-[#15A9A0] text-sm font-medium border border-[#15A9A0] rounded-[9.13px] py-[8px] px-[19px]"
            />

            <div className="flex gap-10 pr-0 xs:pr-5 sm:pr-10">
              <div>
                <h6 className="text-[#06152B] text-xs font-medium mb-3 xs:text-right">
                  Total
                </h6>
                <h6 className="text-[#06152B] text-xs font-medium ">
                  Payment Status
                </h6>
              </div>
              <div>
                <h6 className="text-[#06152B] text-[10.95px] font-medium mb-3">
                  ₹ {data?.adminOrder?.amount}
                </h6>
                <h6 className="text-[#06152B] text-[10.95px] font-medium ">
                  COD
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="my-[14px] px-2.5 sm:px-[21px] pt-[17px] w-full  rounded-[14.6px] shadow-order-detail-shadow overflow-x-auto pb-[29px]">
          <div className="sm:w-full w-[600px]  flex border-b-[0.91px] pb-[35px] border-b-[#CACACA] justify-between items-center gap-4">
            <div className="flex items-center sm:w-[300px] gap-2 sm:gap-[35px]">
              <div className=" bg-white flex items-center justify-center overflow-hidden px-[5px]  rounded-[3.65px]">
                <img
                  src="/bottle.png"
                  alt="product"
                  className="h-8 w-8 sm:w-auto sm:h-[68px] object-cover"
                />
              </div>
              <h2 className="text-[#06152B] text-xs">
                MuscleBlaze Biozyme Performance Whey, 2 kg (4.4 lb), Rich
                Chocolate
              </h2>
            </div>

            <div className="flex items-center pr-0 xs:pr-5 sm:pr-10 gap-5 text-[#06152B] text-xs font-medium">
              <h5 className="text">
                Quantity: <span className="font-bold">1</span>
              </h5>
              <h5>
                Price: <span className="font-bold"> 3,099</span>
              </h5>
            </div>
          </div>

          <div className="flex items-center mt-5 mb-[50px] justify-between">
            <h4 className="text-[#4B4F55] font-medium">Tracking</h4>
            <div className="text-[#06152B] text-[10.95px] space-y-2.5">
              <h5>
                Shipped via: <span className="text-[#A0AEC0]"> Shiprocket</span>
              </h5>
              <h5>
                Tracking ID:{" "}
                <span className="text-[#A0AEC0]"> 34VB5540K83</span>
              </h5>
            </div>
          </div>

          <OrderProgressBar />
        </div>{" "}
        <div className="my-[14px] px-2.5 sm:px-[21px] pt-[17px] w-full  rounded-[14.6px] shadow-order-detail-shadow overflow-x-auto pb-[29px]">
          <div className="sm:w-full w-[600px]  flex border-b-[0.91px] pb-[35px] border-b-[#CACACA] justify-between items-center gap-4">
            <div className="flex items-center sm:w-[300px] gap-2 sm:gap-[35px]">
              <div className=" bg-white flex items-center justify-center overflow-hidden px-[5px]  rounded-[3.65px]">
                <img
                  src="/bottle.png"
                  alt="product"
                  className="h-8 w-8 sm:w-auto sm:h-[68px] object-cover"
                />
              </div>
              <h2 className="text-[#06152B] text-xs">
                MuscleBlaze Biozyme Performance Whey, 2 kg (4.4 lb), Rich
                Chocolate
              </h2>
            </div>

            <div className="flex items-center pr-0 xs:pr-5 sm:pr-10 gap-5 text-[#06152B] text-xs font-medium">
              <h5 className="text">
                Quantity: <span className="font-bold">1</span>
              </h5>
              <h5>
                Price: <span className="font-bold"> 3,099</span>
              </h5>
            </div>
          </div>

          <div className="flex items-center mt-5 mb-[50px] justify-between">
            <h4 className="text-[#4B4F55] font-medium">Tracking</h4>
            <div className="text-[#06152B] text-[10.95px] space-y-2.5">
              <h5>
                Shipped via: <span className="text-[#A0AEC0]"> Shiprocket</span>
              </h5>
              <h5>
                Tracking ID:{" "}
                <span className="text-[#A0AEC0]"> 34VB5540K83</span>
              </h5>
            </div>
          </div>

          <OrderProgressBar />
        </div>
      </div>
      <div className="w-full left-1/2 translate-x-[-50%] absolute bottom-0 min-h-[200px]  bg-white -z-10"></div>
    </div>
  );
};

export default OrderDetails;
