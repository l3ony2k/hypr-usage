import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';
import { getChartColors } from '../../utils/chartColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const ModelPieChart = ({ data }) => {
  const chartRef = useRef();
  const { theme } = useTheme();
  const chartColors = getChartColors(theme);

  // Limit to top 10 for pie chart readability
  const limitedData = data.slice(0, 10);

  const chartData = {
    labels: limitedData.map(([model]) => 
      model.length > 20 ? model.substring(0, 20) + '...' : model
    ),
    datasets: [
      {
        data: limitedData.map(([, usage]) => usage),
        backgroundColor: chartColors.palette.slice(0, limitedData.length),
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