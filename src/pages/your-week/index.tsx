import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function YourWeek() {
    
    const today = new Date().toDateString();
    const currentWeek = getWeekAsArray();

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

  return (
    <div>
    <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}> Your Week </Typography>
    <Typography variant='body2'> Here you can find a summary of the current week</Typography>
    <Button variant="outlined"  size="small" sx={{marginTop: 2, marginBottom: 4}}> Expand all </Button>
    {currentWeek.map((day) => {return(

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontWeight: 500}} > {day} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    )})}

    </div>
  );
}

