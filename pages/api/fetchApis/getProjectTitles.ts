import ProjectList, {TitleDocument} from '../../../models/projectTitles';
import connectToMongoDB from '../../../lib/mongoconnect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const db = await connectToMongoDB();
    const projects: TitleDocument[] = await ProjectList.find({}).lean();
    res.status(200).json({ projects });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
}