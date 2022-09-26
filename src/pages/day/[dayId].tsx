import Typography from "@mui/material/Typography";
import prisma from "src/lib/prisma";
import { Day, DayQuality, DayStatus, User } from '@prisma/client';
import DayCard from "src/views/day/DayCard";
import { getToken } from "next-auth/jwt";

export default function EditDayDetails({dayDocument, activities}: {dayDocument: Day, activities: string[]}) {
    return (
        <div>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}> {dayDocument.date}</Typography>
            <Typography variant='body2'> Here you can edit a day, or add details</Typography>

            <DayCard day={dayDocument} activities={activities}/>
        </div>
    )
}

export async function getServerSideProps(context: { req: any; params: any }) {

    let dayDocument =  await prisma.day.findUnique({
        where: {
          id: context.params.dayId, 
        }
      }) 

    const token: any = await getToken({
          req: context.req,
          secret: process.env.JWT_SECRET
        })
      
        let user: User | null
        if (token) {
          user = await prisma.user.findUnique({
            where: {
              id: token.user.id
            }
          })
        } else {
          throw new Error('No Token')
        }
      
    const activities = user!.activities ? user!.activities : []
  
    return {
      props: {
        dayDocument,
        activities
      }, //
    }
  }