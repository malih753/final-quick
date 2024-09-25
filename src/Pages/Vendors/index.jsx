import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";
import Button from "../../Common/Button";
import { PlusIcon } from "../../assets/icons";

import useSWR from "swr";
import Spinner from "../../Common/Spinner";
import { server } from "../../Constants/server";
import { fetcher } from "../../utils/fetcher";
import Card from "./components/Card/Card";
import Stats from "./components/Stats/Stats";
import TopVendors from "./components/Top Vendors/TopVendors";
import VendorsList from "./components/Vendors List/VendorLists";

const options = ["Today", "Yesterday", "Last 7 days", "Last 30 days"];
const Vendors = () => {
  const [cardsStats, setCardsStats] = useState([]);

  const { data, isLoading } = useSWR(`${server}/vendor.summry`, fetcher);
  console.log(data);

  useEffect(() => {
    if (data) {
      const { summary } = data || {};
      setCardsStats([
        {
          title: "Net Revenue",
          value: "₹ " + (summary?.totalRevenueSum || 0),
        },
        {
          title: "Products Live",
          value: summary?.totalProductsSum || 0,
        },
        {
          title: "Units sold",
          value: summary?.totalOrdersSum || 0,
        },
        {
          title: "Vendors Onboard",
          value: summary?.totalVendorsCount || 0,
        },
      ]);
    }
  }, [data]);
  return (
    <div className="pb-5">
      <div className="flex items-center py-5 my-2 justify-between flex-wrap gap-5">
        <h2 className="text-[#4B4F55] text-lg">Vendors Summary</h2>
        <div className="flex items-center gap-4">
          {/* <Button btnClass="text-white bg-[#15A9A0] py-3  px-[18px] rounded-[9.17px]">
            <PlusIcon color={"#fff"} width={18} height={18} />
            Add New
          </Button> */}

          <ReactDropdown
            placeholder={"Today"}
            options={options}
            arrowClosed={<KeyboardArrowDownIcon />}
            arrowOpen={<KeyboardArrowDownIcon />}
            controlClassName="!bg-white !rounded-[10px] !p-2.5 !text-[#06152B] !placeholder-[#B8B8B8] w-[121px]"
            menuClassName="bg-white mt-3  rounded-[6px] text-[#06152B]"
          />
        </div>
      </div>
      <div className="my-6 flex flex-wrap gap-4">
        {cardsStats?.map((item, index) => (
          <Card key={index} title={item.title} value={item.value} />
        ))}
      </div>
      <div className="space-y-[14px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center absolute">
            <Spinner classes={"w-14 h-14"} />
          </div>
        ) : (
          <Stats monthlyRevenue={data?.monthlyRevenue} />
        )}

        <TopVendors />
        <VendorsList />
      </div>
    </div>
  );
};

export default Vendors;
