import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { getToken } from 'next-auth/jwt'
import { User } from '@prisma/client'
import prisma from 'src/lib/prisma';

export default function Tags({ activities }: { activities: string[] }) {
  return (
    <Autocomplete
    multiple
    id='tags-filled'
    options={activities.map(option => option)}
    freeSolo
    renderTags={(value: readonly string[], getTagProps) =>
      value.map((option: string, index: number) => (
        <Chip variant='outlined' label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => <TextField {...params} label='Activities' placeholder='Favorites' />}
      />
      )
}

async function updateDay(userId: string, activitiesToCreate: string[]) {
  const data = {
    id: id,
    quality: quality,
    status: 'DONE'
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