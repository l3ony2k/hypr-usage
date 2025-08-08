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
import { useTheme } from '../../contexts/ThemeContext';
import { getChartColors } from '../../utils/chartColors';

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
  const { theme } = useTheme();
  const chartColors = getChartColors(theme);

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