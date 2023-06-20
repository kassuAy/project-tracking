import User, {UserDocument} from "../../models/user";
import { connectToMongoDB } from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const db = await connectToMongoDB()
        const students: UserDocument[] = await User.find({role: 'student'})
        res.status(200).json({students})
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 