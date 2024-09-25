import React, { useEffect, useState } from "react";
import Button from "../../Common/Button";
import {
  AnalyticsIcon,
  DashboardOrdersIcon,
  DiscIcon,
  ExportIcon,
} from "../../assets/icons";
import Card from "./Components/Card/Card";
import { dashboardCardData } from "../../Constants/dashboardCardData";
import SalesGraph from "./Components/Sale Graph/SalesGraph";
import TopProducts from "./Components/Top Products/TopProducts";
import { fetcher } from "../../utils/fetcher";
import { server } from "../../Constants/server";
import useSWR from "swr";
import { formatToK } from "../../utils/formatToK";

const Dashboard = () => {
  const [cardsStats, setCardsStats] = useState([]);
  const { data, error } = useSWR(`${server}/dashboard.summary`, fetcher);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (data?.data) {
      const {
        totalTodaySales,
        totalOrders,
        totalProducts,
        totalDeliveredOrder,
      } = data?.data;
      setCardsStats([
        {
          title: "Total Sales Today",
          value: `$${formatToK(totalTodaySales?.amount || 0)}`,
          icon: AnalyticsIcon,
          sub_title: totalTodaySales?.text,
          color: "#FA5A7D",
          bgColor: "#FFE2E5",
        },
        {
          title: "Today’s Order",
          value: totalOrders?.count || 0,
          icon: DashboardOrdersIcon,
          sub_title: totalOrders?.text,
          color: "#FF947A",
          bgColor: "#FFF4DE",
        },

        {
          bgColor: "#DCFCE7",
          title: "Product Sold",
          value: totalProducts?.count || 0,
          icon: DiscIcon,
          sub_title: totalProducts?.text,
          color: "#3CD856",
        },
        {
          title: "Delivered Orders",
          value: totalDeliveredOrder?.count || 0,
          icon: DiscIcon,
          sub_title: totalDeliveredOrder?.text,
          color: "#BF83FF",
          bgColor: "#F3E8FF",
        },
      ]);
    }
  }, [data]);

  console.log(data);
  return (
    <div className="lg:min-h-[70vh] pb-5 lg:pb-0">
      <div className="md:pl-[27px] pt-5 px-0 md:pr-[32px] pb-[29px]">
        <div className="flex items-center flex-wrap justify-between">
          <div className="space-y-1">
            <h2 className="text-[#05004E] text-[17.88px]">Today’s Sales</h2>
            <p className="text-[#737791] text-[14.3px]">Sales Summery</p>
          </div>

          <Button btnClass="border-[0.89px] border-[#C3D3E2] text-[#0F3659] text-xs py-[8.94px] px-[14px] rounded-[7.15px] ">
            <ExportIcon />
            <span className="">Export</span>
          </Button>
        </div>

        <div className="mt-[38px] flex-wrap lg:flex-nowrap flex gap-[27px]">
          {cardsStats?.map((card) => (
            <Card
              icon={card.icon}
              title={card.title}
              sub_title={card.sub_title}
              value={card.value}
              color={card.color}
              bgColor={card.bgColor}
            />
          ))}
          <div className="w-full sm:w-[241px] bg-dashboard-card-gradient p-[17.88px] pr-3 h-[164px]  rounded-[14.3px] bg">
            <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center bg-[#FA5A7D]">
              <AnalyticsIcon />
            </div>

            <h1 className="text-[22px] sm:text-[36px] text-[#151D48] mt-[14px] mb-[13px]">
              $ {formatToK(data?.data?.earning?.amount || 0)}
            </h1>
            <h4 className="text-[#425166] text-sm">Total Earning This Month</h4>
          </div>
        </div>
      </div>

      <div className="lg:h-[300px] flex-wrap flex gap-[22px] relative">
        <SalesGraph monthlyRevenue={data?.data?.monthlyRevenue}/>

        <TopProducts topProducts={data?.top5Product}/>
      </div>
    </div>
  );
};

export default Dashboard;
