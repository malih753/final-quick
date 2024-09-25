import React from "react";
import ReactApexChart from "react-apexcharts";
import { formatToK } from "../../../../utils/formatToK";

const SalesGraph = ({ monthlyRevenue = [] }) => {
  const months = monthlyRevenue?.map((item) => item?.month);

  const revenue = monthlyRevenue?.map((item) => formatToK(item?.amount));

  const state = {
    series: [
      {
        data: revenue, // Example data in thousands
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false, // This hides the menu icon
        },
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: ["#0095FF"],
      plotOptions: {
        bar: {
          columnWidth: "20%",
          distributed: true,
          borderRadius: 2,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "12px",
          colors: ["#000000"], // Set the color for data labels
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "k"; // Customize tooltip to display only value with "k"
          },
          title: {
            formatter: () => '', // Remove or customize the title (remove "series-1")
          }
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu","Fri", "Sat", "Sun"],
        labels: {
          style: {
            fontSize: "12px",
            colors: Array(7).fill("#7B91B0"), // Add custom colors for each label if needed
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "k"; // Add "k" to y-axis labels
          },
          style: {
            fontSize: "12px",
            colors: ["#7B91B0"], // Customize y-axis label colors
          },
        },
      },
    },
  };
  

  return (
    <div className="lg:w-[60%] w-full lg:absolute bg-white rounded-[20px] pt-[26px] px-0 md:px-[28px] pb-0 sm:pb-[35px]">
      <div className="flex justify-between items-start">
        <h3 className="text-[#05004E] text-xl mb-[20px]">Total Revenue</h3>
        <div className="flex items-center gap-2">
          <span className="w-[11px] h-[11px] rounded-full bg-[#0095FF]"></span>
          <h6 className="text-xs text-[#222B45]">Online Sales</h6>
        </div>
      </div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default SalesGraph;
