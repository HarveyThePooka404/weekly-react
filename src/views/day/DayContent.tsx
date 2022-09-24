import { Button, Typography } from "@mui/material";
import { DayQuality, DayStatus } from "@prisma/client";
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import { useRouter } from "next/router";


export default function DayContent({id, status, onStatusChange}: { id: string, status: DayStatus, onStatusChange: any}) {
    if(status == "TOBEDONE") {
        return (
            <div>
                <Button variant="contained" onClick={async () => {await updateDay(id, DayQuality.GOOD),onStatusChange()}} endIcon={<ThumbUp />}> Good</Button>
                <Button variant="outlined" onClick={async () => {await updateDay(id, DayQuality.BAD), onStatusChange()}} color="secondary" endIcon={<ThumbDown />} sx={{marginLeft: 4}}> Shit </Button>
            </div>
        )
    } else {
        return(
            <div>
                <Typography> You've already answered for that day. Would you like to add details?</Typography>
            </div>
        )
    }
}

async function updateDay(id: string, quality: DayQuality) {
    const data = {
        id: id, 
        quality: quality
    }
    
    const JSONdata = JSON.stringify(data) 

    const endpoint = '/api/updateDay'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSONdata
    }

    const response = await fetch(endpoint, options);
    const result = await response.json();
    return result
}