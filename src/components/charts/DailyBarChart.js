import React, { useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { roundMoney } from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DailyBarChart = ({ data }) => {
  const chartRef = useRef();

  // OneDark theme colors
  const chartColors = {
    primary: '#61afef',
    background: '#21252b',
    secondary: '#282c34',
    border: '#3e4451',
    text: '#abb2bf',
    textSecondary: '#5c6370'
  };

  const chartData = useMemo(() => {
    // Calculate daily totals
    const dailyTotals = data.map(day => {
      let total = 0;
      Object.keys(day).forEach(key => {
        if (key !== 'date') {
          total += roundMoney(day[key]);
        }
      });
      return {
        date: day.date,
        total: total
      };
    });

    return {
      labels: dailyTotals.map(day => 
        new Date(day.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })
      ),
      datasets: [
        {
          label: 'Daily Usage ($)',
          data: dailyTotals.map(day => day.total),
          backgroundColor: chartColors.primary,
          borderColor: chartColors.border,
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: chartColors.secondary,
        titleColor: chartColors.text,
        bodyColor: chartColors.text,
        borderColor: chartColors.border,
        borderWidth: 1,
        callbacks: {
          title: function(context) {
            const index = context[0].dataIndex;
            return new Date(data[index].date).toLocaleDateString();
          },
          label: function(context) {
            return `Total Usage: $${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: chartColors.text,
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: chartColors.border,
        },
      },
      y: {
        ticks: {
          color: chartColors.text,
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        },
        grid: {
          color: chartColors.border,
        },
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={options} />;
};

export default DailyBarChart;