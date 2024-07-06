import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  scales,
} from 'chart.js';
import { getLast7Days } from '../lib/features';
import { orange } from '../constants/color';

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const lables = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels: lables,
    datasets: [
      {
        label: 'Last 7 days message',
        data: value,
        fill: true,
        borderColor: 'rgb(255, 99, 132,1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughuntChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 130,
};

const DoughnutChart = ({ value = [], labale = [] }) => {
  const data = {
    labels: labale,
    datasets: [
      {
        data: value,
        borderColor: ['rgb(255, 99, 132,1)', orange],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', orange],
        offset : 10
      },
    ],
  };
  return <Doughnut style={{zIndex : 10}} data={data} options={doughuntChartOptions} />;
};

export { LineChart, DoughnutChart };
