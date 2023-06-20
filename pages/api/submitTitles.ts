import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '../../lib/mongodb';
import { IGroup, ITitle } from '../../types';
import ProjectList from '../../models/projectTitles';
import mongoose from 'mongoose';
type unionType = String | Number;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch((err) => res.json(res));

  if (req.method === 'POST') {
    if (!req.body) return res.status(400).json({ error: 'data is missing' });

    const { groupName, projects } = req.body;

    const groupExists = await ProjectList.findOne({ groupName });
    const titleExists = await ProjectList.findOne({ projects });
    if (groupExists && titleExists) {
      return res
        .status(409)
        .json({ error: 'the group name you entered already exists' });
    } else {
      if (groupName.length === 0)
        return res.status(409).json({ error: 'this field is required' });

      try {
        const projecttitle: ITitle = await ProjectList.create({
            groupName,
            projects
        })

        res.status(201).json({projecttitle})
      }catch(error){
        return res.status(500).json({ error: "Failed to submit title" });
      }
    }
  } else {
    res.status(405).json({
      error: 'Method Not Allowed',
    });
  }
};
export default handler;

// import { NextApiRequest,NextApiResponse } from "next";
// import { connectToMongoDB } from "../../lib/mongodb";
// import { IGroup, ITitle } from "../../types";
// import ProjectList from "../../models/projectTitles";
// import mongoose from "mongoose";

// type unionType =String | Number;
// const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
//     connectToMongoDB().catch(err=> res.json(res))

//     if(req.method === 'POST'){
//         if(!req.body) return res.status(400).json({error:"data is missing"})

//         const {groupName, projectTitles}=req.body

//         const groupExists = await ProjectList.findOne({groupName})
//         const titleExists=await ProjectList.findOne({projectTitles})
//         if(groupExists && titleExists){
//             return res.status(409).json({error: "the group name you entered already exists"})
//         }
//         else{
//             if(groupName.length === 0)
//              return res.status(409).json({error: "this field is required"})

//             try{
//                 const projectTitle: ITitle = await ProjectList.create({
//                     groupName,
//                     projectTitles
//                  })
    
//                 res.status(201).json({projectTitle})
//             }catch(error){
//                 return res.status(500).json({ error: "Failed to submit title" });
//             }
// }

// }

// else {
//     res.status(405).json({
//         error: 'Method Not Allowed'})
//     }
// }
// export default handler