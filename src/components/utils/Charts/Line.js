import React from "react";
import chartConfig from "./chartConfig";
import { Line } from "react-chartjs-2";
const LineChart = ({ labels, data, chartName }) => {
  const config = chartConfig(labels, data, chartName);
  return (
    <Line
      data={config}
      options={{
        legend: { display: false },
        scales: {
          yAxes: [
            {
              id: "row-count-y-axis",
              type: "linear",
              position: "left",
              ticks: {
                stepSize: (Math.max(...data) - Math.min(...data)) / 5,
                // display: false,
              },

              gridLines: {
                color: "#ffeefe",
              },
            },
          ],
          xAxes: [{ gridLines: { display: false } }],
        },
      }}
    />
  );
};
export default LineChart;
