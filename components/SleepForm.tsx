'use client';

import { useState } from 'react';
import { Calendar, Clock, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepFormProps {
    onAdd: (date: Date, hours: number) => void;
    className?: string; // Add className prop
}

export default function SleepForm({ onAdd, className }: SleepFormProps) {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [hours, setHours] = useState<number>(8);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(new Date(date), hours);
        setIsOpen(false);
        // Reset defaults
        setDate(new Date().toISOString().split('T')[0]);
        setHours(8);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={cn( // Use cn to merge classes
                    "w-full py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2 font-medium bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm",
                    className // Apply custom classes if provided
                )}
            >
                <Clock className="w-5 h-5" />
                Log New Sleep Session
            </button>
        );
    }

    return (
        <div className={cn("bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700 p-6 animate-in slide-in-from-top-4 duration-200", className)}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Log Sleep Session</h3>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                        </label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Duration (Hours)
                        </label>
                        <input
                            type="number"
                            required
                            min="0"
                            max="24"
                            step="0.1"
                            value={hours}
                            onChange={(e) => setHours(parseFloat(e.target.value))}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 active:scale-95 font-medium flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Record
                    </button>
                </div>
            </form>
        </div>
    );
}
