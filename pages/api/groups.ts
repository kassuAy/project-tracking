import Group from "../../models/Group";
import { IGroup } from "../../types";

import { connectToMongoDB } from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    try {
        const db = await connectToMongoDB()
        const groups: IGroup[] = await Group.find({})
        res.status(200).json({groups})
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 