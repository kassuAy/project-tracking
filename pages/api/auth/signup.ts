import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
// import { connectToMongoDB } from "../../../lib/mongodb"
import connectToMongoDB from "../../../lib/mongoconnect"
import User, {UserDocument} from "../../../models/user"
import { FormData } from "../../../types"
import mongoose from "mongoose"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { fullName, email, username, password, role }: FormData = req.body

        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(409).json({ error: "User Already exists" })
        }
        
        if (password.length < 8)               
            return res.status(409).json({ error: "passwords length should be 8 character" })

        const hashPassword = await hash(password, 12)

        try{
            const newUser: UserDocument = await User.create({
                fullName,
                email,
                username,
                password: hashPassword,
                role,
            })

            return res.status(201).json({user: newUser})
        } catch(error){
            return res.status(500).json({ error: "Failed to create user" });
        }           
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler