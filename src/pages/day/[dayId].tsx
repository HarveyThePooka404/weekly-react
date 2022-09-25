import Typography from "@mui/material/Typography";
import prisma from "src/lib/prisma";
import { Day, DayQuality, DayStatus } from '@prisma/client';
import DayCard from "src/views/day/DayCard";

export default function EditDayDetails({dayDocument}: {dayDocument: Day}) {
    return (
        <div>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}> {dayDocument.date}</Typography>
            <Typography variant='body2'> Here you can edit a day, or add details</Typography>

            <DayCard day={dayDocument}/>
        </div>
    )
}

export async function getServerSideProps(context: { req: any; params: any }) {

    let dayDocument =  await prisma.day.findUnique({
        where: {
          id: context.params.dayId, 
        }
      }) 

  
    return {
      props: {
        dayDocument
      }, //
    }
  }