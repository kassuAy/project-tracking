import { NextApiRequest,NextApiResponse } from "next";
import { connectToMongoDB } from "../../lib/mongodb";
import Group from "../../models/Group";
import { IGroup } from "../../types";
import mongoose from "mongoose";

type unionType =String | Number;
const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
    connectToMongoDB().catch(err=> res.json(res))

    if(req.method === 'POST'){
        if(!req.body) return res.status(400).json({error:"data is missing"})

        const {group_name, students, batch}=req.body

        const groupExists = await Group.findOne({group_name})
        
        if(groupExists){
            return res.status(409).json({error: "the group name you entered already exists"})
        }
        else{
            if(batch.length === 0)
             return res.status(409).json({error: "this field is required"})
            
             try {
                const newGroup: IGroup = await Group.create({
                    group_name,
                    students,
                    batch
                })

                return res.status(201).json({group: newGroup})
             }catch(error){
                return res.status(500).json({ error: "Failed to create group" });
             }
}

}

else {
    res.status(405).json({
        error: 'Method Not Allowed'})
    }
}
export default handler