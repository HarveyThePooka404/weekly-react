import { Button, Typography } from '@mui/material'
import { getToken } from 'next-auth/jwt'
import prisma from 'src/lib/prisma'

export default function YourProjects() {
  return (
    <div>
      <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
        Your Projects
      </Typography>
      <Typography variant='body2'> Here you can find a list of your current projects</Typography>
      <Button variant='outlined' size='small' sx={{ marginTop: 2, marginBottom: 4 }}>
        Create a project
      </Button>
    </div>
  )
}

export async function getServerSideProps(context: { req: any }) {
  const token: any = await getToken({
    req: context.req,
    secret: process.env.JWT_SECRET
  })

  let projects: any[] = []
  if (token) {
    projects = await prisma.project.findMany({
      where: {
        userId: token.user.id
      }
    })
  } else {
    console.log('No Token, no user logged in')
  }

  return {
    props: {
      projects
    } //
  }
}
