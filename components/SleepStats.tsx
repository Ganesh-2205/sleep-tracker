import { Record } from '@/lib/mockData';
import { ArrowUp, ArrowDown, Moon, Clock, Trophy, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepStatsProps {
    records: Record[];
}

export default function SleepStats({ records }: SleepStatsProps) {
    if (records.length === 0) return null;

    const amounts = records.map((r) => r.amount);
    const total = amounts.reduce((acc, curr) => acc + curr, 0);
    const average = total / amounts.length;
    const max = Math.max(...amounts);
    const min = Math.min(...amounts);

    const stats = [
        {
            label: 'Average Sleep',
            value: `${average.toFixed(1)} hrs`,
            icon: Clock,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            description: 'Daily average over time',
        },
        {
            label: 'Best Sleep',
            value: `${max.toFixed(1)} hrs`,
            icon: Trophy,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            description: 'Your longest rest',
        },
        {
            label: 'Shortest Sleep',
            value: `${min.toFixed(1)} hrs`,
            icon: AlertCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            description: 'Time to improve!',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="p-6 bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700 transition-transform hover:scale-[1.02]"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                {stat.label}
                            </p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {stat.value}
                            </h3>
                        </div>
                        <div className={cn('p-3 rounded-xl', stat.bg)}>
                            <stat.icon className={cn('w-6 h-6', stat.color)} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        {stat.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
