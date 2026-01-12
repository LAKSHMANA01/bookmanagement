import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();
        const users = await User.find();
        return Response.json(users);
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await connectDB();
    const data = await req.json();
    const user = await User.create(data);
    return Response.json(user, { status: 201 });
}
