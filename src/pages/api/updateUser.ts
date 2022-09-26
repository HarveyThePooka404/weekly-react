
import { DayStatus } from "@prisma/client";
import  prisma  from "src/lib/prisma"

export default async function handler(req, res){
    if(req.method === 'POST'){
        return await UpdateUser(req, res);
    }else{
        res.status(405).json({
            message: 'Method not allowed',
            success: false
        })
    }
}

async function UpdateUser(req, res){
    const data = {...req.body}
    delete data["id"];
    
    try{
        const day = await prisma.user.update({
            where: {
                id: req.body.id
            },
            data: {
                ...data
            }
        })
        res.status(200).json({
            message: 'User Updated',
            success: true
        })

        return day
    }catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating User Document", success:false });
    }
} 