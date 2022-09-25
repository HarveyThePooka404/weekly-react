import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

//documents
import prisma from 'src/lib/prisma';
import { getWeekNumber } from 'src/lib/util';
import { getToken } from 'next-auth/jwt';
import { Day, DayQuality, DayStatus } from '@prisma/client';
import DayStatusPill from 'src/views/pills/DayStatusPill';
import DayContent from 'src/views/day/DayContent';

//rehydratation
import { useRouter } from "next/router"

function getFirstDayOfWeek(today: Date) {
  const date = new Date(today);
  const day = date.getDay(); 
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

function getWeekAsArray(): Array<string> {
  const monday = getFirstDayOfWeek(new Date());
  const options = {weekday: "long", month: "long", day: "numeric"}
  const arrayOfDaysAsString = [];
  arrayOfDaysAsString.push(monday.toLocaleDateString('en-uk', options))
  
  for(let i = 1; i < 7; i++) {
      const tomorrow = new Date(monday)
      tomorrow.setDate(monday.getDate() + i)
      arrayOfDaysAsString.push(tomorrow.toLocaleDateString('en-uk', options))
  }

  return arrayOfDaysAsString
}

export default function YourWeek({days}: {days: Day[]}) {
  const router = useRouter();
  function refreshData() {
    router.replace(router.asPath)
  }

  
  
  return (
    <div>
    <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}> Your Week </Typography>
    <Typography variant='body2'> Here you can find a summary of the current week</Typography>

    <Button variant="outlined"  size="small" sx={{marginTop: 2, marginBottom: 4}}> Expand all </Button>
    {days.map((day: Day) => {return(

      <Accordion key={day.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontWeight: 500}} > {day.date} <DayStatusPill status={day.status} quality={day.quality}/></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DayContent id={day.id} status={day.status} onStatusChange={refreshData}/>
        </AccordionDetails>
      </Accordion>
    )})}

    </div>
  );
}

export async function getServerSideProps(context: { req: any; }) {
  const token: any = await getToken({
    req: context.req,
    secret: process.env.JWT_SECRET,
  })

  let days
  if(token) {
    days =  await prisma.day.findMany({
      where: {
        userId: token.user.id,
        weekNumber: getWeekNumber(new Date().toDateString())
      }
    }) 
  } else {
    throw new Error("No Token")
  }

  if(days.length < 6) {
    createAllWeeksDocument();
  }
  
  function createAllWeeksDocument(): void {
    const currentWeek = getWeekAsArray()
    currentWeek.forEach(async dateAsString => {
      const day = {
        date: dateAsString,
        userId: token.user.id,
        quality: DayQuality.GOOD,
        status: DayStatus.TOBEDONE,
        weekNumber: getWeekNumber(new Date().toDateString()),
        textDetail: ''
      }
      const dayDocument = await prisma.day.create({
        data: { ...day }
      })
      days.push(dayDocument)
    })
  }

  days.sort((a: Day, b: Day) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return {
    props: {
      days
    }, //
  }
}
