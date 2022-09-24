
import { DayStatus } from "@prisma/client";
import  prisma  from "src/lib/prisma"

export default async function handler(req, res){
    if(req.method === 'POST'){
        return await UpdateDay(req, res);
    }else{
        res.status(405).json({
            message: 'Method not allowed',
            success: false
        })
    }
}

async function UpdateDay(req, res){
    try{
        const day = await prisma.day.update({
            where: {
                id: req.body.id
            },
            data: {
                status: DayStatus.DONE,
                quality: req.body.quality
            }
        })
        res.status(200).json({
            message: 'Day Updated',
            success: true
        })

        return day
    }catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error updating Day Document", success:false });
    }
} 