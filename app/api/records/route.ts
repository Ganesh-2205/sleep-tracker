import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import Record from '@/models/Record';

async function getUserId() {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string;
    } catch {
        return null;
    }
}

export async function GET() {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const records = await Record.find({ userId }).sort({ date: -1 });

        return NextResponse.json(records);
    } catch (error) {
        console.error('Fetch records error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { date, amount } = await req.json();

        if (!date || amount === undefined) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const record = await Record.create({
            userId,
            date: new Date(date),
            amount,
        });

        return NextResponse.json(record, { status: 201 });
    } catch (error) {
        console.error('Create record error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
