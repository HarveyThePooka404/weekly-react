import Button from "@mui/material/Button"
import { DayQuality } from "@prisma/client"
import ThumbDown from "mdi-material-ui/ThumbDown"
import ThumbUp from "mdi-material-ui/ThumbUp"

export default function ButtonUpdatingday({id, onStatusChange}: {id: string, onStatusChange: any}) {
    return(
        <div>
            <Button variant="contained" onClick={async () => {await updateDay(id, DayQuality.GOOD), onStatusChange()}} endIcon={<ThumbUp />}> Good</Button>
            <Button variant="outlined" onClick={async () => {await updateDay(id, DayQuality.BAD), onStatusChange()}} color="secondary" endIcon={<ThumbDown />} sx={{marginLeft: 4}}> Shit </Button>
        </div>
    )
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