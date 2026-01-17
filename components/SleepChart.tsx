'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Record } from '@/lib/mockData';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface SleepChartProps {
    records: Record[];
}

export default function SleepChart({ records }: SleepChartProps) {
    // Sort records by date just in case
    const sortedRecords = [...records].sort((a, b) => a.date.getTime() - b.date.getTime());

    const data = {
        labels: sortedRecords.map((r) => format(r.date, 'MMM dd')),
        datasets: [
            {
                label: 'Sleep Duration (Hours)',
                data: sortedRecords.map((r) => r.amount),
                fill: true,
                borderColor: 'rgb(99, 102, 241)', // Indigo-500
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4, // Smooth curve
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(99, 102, 241)',
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
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
                ticks: {
                    stepSize: 2,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    return (
        <div className="w-full h-[400px] p-6 bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Sleep Trends</h3>
            <div className="h-[320px]">
                <Line options={options} data={data} />
            </div>
        </div>
    );
}
