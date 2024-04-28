'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: 'My First Dataset',
        data: [1, 2, 3, 2, 1, 3, 4],
        fill: false,
        borderColor: '#ff0000',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        min: 0,
        max: 10,
      },
      y: {
        min: 0,
        max: 5,
        grid: {
          borderDash: [10],
        },
      },
    },
  };
  return (
    <div className="bg-gray-100 p-2">
      <Line options={options} data={data} height={350} />
    </div>
  );
};

export default LineChart;
