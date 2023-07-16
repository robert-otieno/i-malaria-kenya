import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ data, height }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Malaria Cases",
        data: Object.values(data),
        fill: true,
        borderColor: "teal",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} height={height} options={chartOptions} />;
};

export default LineChart;
