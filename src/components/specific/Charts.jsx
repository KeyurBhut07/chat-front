import React from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
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
} from 'chart.js'

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
)

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
}

const LineChart = () => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 10, 5, 2, 20, 30],
        fill: true,
        borderColor: 'rgb(255, 99, 132,1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [1, 15, 23, 9, 8, 5],
        borderColor: 'rgb(75,12,192,0.7)',
        fill: true,
        backgroundColor: 'rgba(75,12,192,1)',
      },
    ],
  }
  return <Line data={data} options={lineChartOptions} />
}

const DoughnutChart = () => {
  return <div>Charts</div>
}

export { LineChart, DoughnutChart }
