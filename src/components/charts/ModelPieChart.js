import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ModelPieChart = ({ data }) => {
  const chartRef = useRef();

  // OneDark theme colors
  const chartColors = {
    primary: '#61afef',
    success: '#98c379',
    warning: '#e5c07b',
    danger: '#e06c75',
    info: '#56b6c2',
    purple: '#c678dd',
    background: '#21252b',
    secondary: '#282c34',
    border: '#3e4451',
    text: '#abb2bf',
    textSecondary: '#5c6370'
  };

  const chartColorPalette = [
    chartColors.primary,
    chartColors.success,
    chartColors.warning,
    chartColors.danger,
    chartColors.info,
    chartColors.purple,
    '#d19a66',
    '#56b6c2',
    '#be5046',
    '#4078f2'
  ];

  // Limit to top 10 for pie chart readability
  const limitedData = data.slice(0, 10);

  const chartData = {
    labels: limitedData.map(([model]) => 
      model.length > 20 ? model.substring(0, 20) + '...' : model
    ),
    datasets: [
      {
        data: limitedData.map(([, usage]) => usage),
        backgroundColor: chartColorPalette.slice(0, limitedData.length),
        borderColor: chartColors.border,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: chartColors.text,
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: chartColors.secondary,
        titleColor: chartColors.text,
        bodyColor: chartColors.text,
        borderColor: chartColors.border,
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
          }
        }
      },
    },
  };

  return <Pie ref={chartRef} data={chartData} options={options} />;
};

export default ModelPieChart;