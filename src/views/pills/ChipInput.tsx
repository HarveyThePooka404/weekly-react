import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Tags({
  activities,
  doneDuringTheDay,
  updateDay
}: {
  activities: string[]
  doneDuringTheDay: string[]
  updateDay: any
}) {
  const [activitiesToShow, addActivity] = useState(activities)

  const updateTag = (event: any, value: string[]) => {
    const target = event.target as HTMLInputElement
    if (typeof target.value == 'string') {
      addNewTagsToUser(target.value)
      addActivity(activitiesToShow => [...activitiesToShow, target.value])
    }

    updateDay.function(updateDay.dayId, 'activities', value)
  }

  return (
    <Autocomplete
      multiple
      id='tags-filled'
      options={activitiesToShow.map(option => option)}
      freeSolo
      onChange={updateTag}
      defaultValue={doneDuringTheDay}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => <TextField {...params} label='Activities' placeholder='Favorites' />}
    />
  )
}

async function addNewTagsToUser(tag: string) {
  await updateUser(tag)
}

async function updateUser(activitiesToAdd: string) {
  const data = {
    activities: activitiesToAdd
  }

  const JSONdata = JSON.stringify(data)

  const endpoint = '/api/updateUser'
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