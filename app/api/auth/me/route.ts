import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        const token = (await cookies()).get('token')?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        if (!payload.userId) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        await connectToDatabase();
        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        // If token is invalid or expired
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
