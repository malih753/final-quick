import React from "react";
import ReactApexChart from "react-apexcharts";
import ReactDropdown from "react-dropdown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DownloadIcon, StatsInfoIcon } from "../../../../assets/icons";

const Stats = ({ monthlyRevenue }) => {
  console.log("monthlyRevenue",monthlyRevenue);
    // Map months and revenue data from the passed prop
    const months = monthlyRevenue?.map((item) =>
      new Date(item?.month).toLocaleString('default', { month: 'short' })
    );
  
    const revenue = monthlyRevenue?.map((item) =>
      Math.round(item?.monthlyRevenue / 1000)
    ) || []  // Assuming revenue is in thousands for the y-axis labels (convert to millions if needed)
  
    const maxValue = Math.max(...revenue); // Find the maximum value in the data
  
    const state = {
      series: [
        {
          data: revenue || [], // Using the revenue data from props
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          toolbar: {
            show: false, // Hide the menu icon
          },
          events: {
            click: function (chart, w, e) {
              // Handle chart click event if necessary
            },
          },
        },
        colors: revenue.map((value) =>
          value === maxValue ? "#15A9A0" : "#F2EFFF"
        ), // Highlight max value
        hover: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "60px",
            distributed: true,
            borderRadius: 8.23,
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 8.23,
            blur: 12.35,
            opacity: 0.5,
          },
        },
        dataLabels: {
          enabled: false,
          style: {
            fontSize: "12px",
            colors: ["#000000"], // Data label color
          },
          
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: months, // Dynamic months from the prop
          labels: {
            style: {
              fontSize: "12px",
              colors: Array(months.length).fill("#A2A3A5"), // Custom colors for each label
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val + "K"; // Assuming data is in thousands, add "K" to y-axis labels
            },
            style: {
              fontSize: "12px",
              colors: ["#7B91B0"], // Customize y-axis label colors
            },
          },
        },
        states: {
          normal: {
            filter: {
              type: "none",
            },
          },
          hover: {
            filter: {
              type: "none", // Disable hover effect
            },
          },
        },
      },
    };
  

  return (
    <div className="w-full bg-white rounded-[20px] pt-[26px] px-0 md:px-[28px] pb-0 sm:pb-[35px]">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[#06152B] text-lg">Overview</h3>
          <StatsInfoIcon />
          <DownloadIcon />
        </div>
        <div className="flex items-center gap-2">
          <ReactDropdown
            placeholder={"Today"}
            options={["Net Revenue"]}
            arrowClosed={<KeyboardArrowDownIcon />}
            arrowOpen={<KeyboardArrowDownIcon />}
            controlClassName="!bg-[#F9FBFF] !rounded-[10px] !py-2 !px-[11px] !text-[#06152B] !placeholder-[#B8B8B8] w-[180px]"
            menuClassName="bg-white mt-3  rounded-[6px] text-[#06152B]"
          />
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

export default Stats;
