import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { connectToDB } from '@/db/db';

connectToDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        const user = await User.findOne({ _id: userId }).select("-password");

        return NextResponse.json(user);
    } catch (error: any) {
        // Return an error response with status 400
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
