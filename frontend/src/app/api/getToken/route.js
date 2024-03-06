import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function GET() {
    try {
        const cookie = cookies();
        const token = cookie.get('token');
        return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}