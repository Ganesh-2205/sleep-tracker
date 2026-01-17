
import { addDays, format, subDays } from 'date-fns';

export type Record = {
    id: string;
    date: Date;
    amount: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
};

// Generate dummy data for the last 30 days
export const generateInitialData = (): Record[] => {
    const data: Record[] = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = subDays(today, i);
        // Random sleep between 4 and 10 hours
        const amount = Number((Math.random() * (10 - 4) + 4).toFixed(1));

        data.push({
            id: crypto.randomUUID(),
            date,
            amount,
        });
    }
    return data;
};

export const MOCK_USER: User = {
    id: 'user_123',
    name: 'Sleepy User',
    email: 'user@example.com',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
};
