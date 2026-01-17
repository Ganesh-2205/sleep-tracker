'use client';

import { useState, useEffect } from 'react';
import SleepChart from './SleepChart';
import SleepStats from './SleepStats';
import SleepForm from './SleepForm';
import { format } from 'date-fns';
import { LogOut, Moon, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { IRecord } from '@/models/Record';

type RecordWithId = {
    _id: string;
    date: string | Date;
    amount: number;
};

export default function DashboardShell() {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const res = await fetch('/api/records');
            if (res.ok) {
                const data = await res.json();
                // Ensure dates are Date objects for calculations
                const formattedData = data.map((r: any) => ({
                    ...r,
                    date: new Date(r.date),
                }));
                setRecords(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch records', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddRecord = async (date: Date, amount: number) => {
        try {
            const res = await fetch('/api/records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, amount }),
            });

            if (res.ok) {
                fetchRecords(); // Reload to get sorted/consistent data
            }
        } catch (error) {
            console.error('Failed to add record', error);
        }
    };

    const handleDeleteRecord = async (id: string) => {
        try {
            const res = await fetch(`/api/records/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setRecords((prev) => prev.filter((r) => r._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete record', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded--lg text-white">
                                <Moon className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                SleepTracker
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border-none">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 pr-2">
                                    {user?.name || 'User'}
                                </span>
                            </div>

                            <button
                                onClick={logout}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Sign Out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's your sleep analysis.</p>
                </div>

                {/* Stats */}
                <SleepStats records={records} />

                {/* Chart & Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <SleepChart records={records} />
                    </div>
                    <div className="space-y-6">
                        <SleepForm onAdd={handleAddRecord} />

                        {/* Recent History Preview */}
                        <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent History</h3>
                            {records.length === 0 ? (
                                <p className="text-gray-500 text-sm">No records yet.</p>
                            ) : (
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {records.slice(0, 5).map((record) => (
                                        <div key={record._id} className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {record.amount} hours
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {format(new Date(record.date), 'MMM dd, yyyy')}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteRecord(record._id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
