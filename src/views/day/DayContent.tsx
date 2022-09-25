import { Button, Typography } from "@mui/material";
import { DayQuality, DayStatus } from "@prisma/client";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import Link from "next/link";
import ButtonUpdatingday from "./ButtonUpdatingDay";


export default function DayContent({id, status, onStatusChange}: { id: string, status: DayStatus, onStatusChange: any}) {
    if(status == "TOBEDONE") {
        return (
            <ButtonUpdatingday id={id} onStatusChange={onStatusChange}/>
        )
    } else {
        return(
            <div>
                <Typography> You've already answered for that day. Would you like to add details? <Link href={`/day/${id}`}> Add details </Link></Typography>
            </div>
        )
    }
}