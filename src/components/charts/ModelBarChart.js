import React, { useRef } from 'react';
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

const ModelBarChart = ({ data }) => {
    const chartRef = useRef();
    const { theme } = useTheme();
    const chartColors = getChartColors(theme);

    // Limit to top 20 for readability
    const limitedData = data.slice(0, 20);

    const chartData = {
        labels: limitedData.map(([model]) =>
            model.length > 15 ? model.substring(0, 15) + '...' : model
        ),
        datasets: [
            {
                label: 'Usage ($)',
                data: limitedData.map(([, usage]) => usage),
                backgroundColor: chartColors.primary,
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
                display: false,
            },
            tooltip: {
                backgroundColor: chartColors.secondary,
                titleColor: chartColors.text,
                bodyColor: chartColors.text,
                borderColor: chartColors.border,
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `Usage: $${context.parsed.y.toFixed(2)}`;
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
                    callback: function (value) {
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

export default ModelBarChart;