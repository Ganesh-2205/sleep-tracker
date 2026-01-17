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

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Params is a Promise in Next.js 15
) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await connectToDatabase();
        const record = await Record.findOneAndDelete({ _id: id, userId });

        if (!record) {
            return NextResponse.json(
                { message: 'Record not found or not authorized' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Record deleted' });
    } catch (error) {
        console.error('Delete record error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
