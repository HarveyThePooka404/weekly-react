import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DayStatusPill from '../pills/DayStatusPill'
import { Day } from '@prisma/client'
import ButtonUpdatingday from './ButtonUpdatingDay'

import { useRouter } from 'next/router'
import { Button, TextareaAutosize } from '@mui/material'
import { render } from 'nprogress'

export default function DayCard({ day }: { day: Day }) {
  const router = useRouter()
  const onStatusChange = () => {
    router.push(router.asPath)
  }

  let textDetailValue: string
  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant='h5' component='div' sx={{ marginBottom: 4 }}>
          Quality of the Day <DayStatusPill status={day.status} quality={day.quality} />
        </Typography>
        <Typography component='div' sx={{ marginBottom: 4 }}>
          You've said that <span style={{ fontWeight: 'bold' }}> {day.date} </span> was a{' '}
          <span style={{ textTransform: 'lowercase' }}>{day.quality}</span> day.
        </Typography>
        <ButtonUpdatingday id={day.id} onStatusChange={onStatusChange} />

        {/* Region for text details */}
        <div>
          <Typography variant='h6' sx={{ marginTop: 6, marginBottom: 2 }}>
            What made it a <span style={{ textTransform: 'lowercase' }}>{day.quality}</span> day ?
          </Typography>
          {day.textDetail == '' && (
            <div>
              <TextareaAutosize
                aria-label='minimum height'
                minRows={3}
                style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
                onChange={e => {
                  textDetailValue = e.target.value
                }}
              />
              <Button
                onClick={() => {
                  updateDay(day.id, textDetailValue)
                }}
                variant='contained'
                size='small'
              >
                Save
              </Button>
            </div>
          )}

          {day.textDetail !== '' && (
            <div>
              <Typography> {day.textDetail}</Typography>
              <Button variant='outlined' size='small' sx={{ marginTop: 4 }}>
                Edit
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

async function updateDay(id: string, textDetail: string) {
  const data = {
    id: id,
    textDetail: textDetail
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

  const response = await fetch(endpoint, options)
  const result = await response.json()
  return result
}