import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DayStatusPill from '../pills/DayStatusPill'
import { Day } from '@prisma/client'
import ButtonUpdatingday from './ButtonUpdatingDay'

import { useRouter } from 'next/router'
import { Button, TextareaAutosize } from '@mui/material'
import { useEffect, useState } from 'react'
import ChipInput from '../pills/ChipInput'

export default function DayCard({ day, activities }: { day: Day; activities: string[] }) {
  const router = useRouter()
  const onStatusChange = () => {
    router.push(router.asPath)
  }

  const [state, setState] = useState('read')
  const [textDetail, setTextDetail] = useState(day.textDetail ? day.textDetail : '')

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
          {
            (state == 'edit' && (
              <div>
                <TextareaAutosize
                  aria-label='minimum height'
                  minRows={3}
                  style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
                  value={textDetail}
                  onChange={e => {
                    setTextDetail(e.target.value)
                  }}
                />
                <Button
                  sx={{ marginTop: 4 }}
                  onClick={() => {
                    updateDay(day.id, 'textDetail', textDetail), setState('read'), onStatusChange()
                  }}
                  variant='contained'
                  size='small'
                >
                  Save
                </Button>
              </div>
            ))}

          {state !== 'edit' && (
            <div>
              <Typography> {textDetail} </Typography>
              <Button
                variant='outlined'
                size='small'
                sx={{ marginTop: 4 }}
                onClick={() => {
                  setState('edit')
                }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Region for activities details */}
        <div>
          <Typography variant='h6' sx={{ marginTop: 6, marginBottom: 2 }}>
            What did you do during that day?
          </Typography>

          <ChipInput
            activities={activities}
            doneDuringTheDay={day.activities}
            updateDay={{ function: updateDay, dayId: day.id }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

async function updateDay(id: string, key: string, value: any) {
  const data = {
    id: id,
    [key]: value
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
