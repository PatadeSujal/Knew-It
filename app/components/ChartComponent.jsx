// app/components/ChartComponent.js
"use client";
import dynamic from "next/dynamic";

// Dynamically import Chart to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartComponent = ({ options, series, type = "donut", height = 320 }) => {
  return <Chart options={options} series={series} type={type} height={height} />;
};

export default ChartComponent;
