// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: {
      colors: [function({ value }: {value: any}) {
        if(value < 1) {
            return '#7E36AF'
        } else if (value >= 1 && value < 2) {
            return '#164666'
        } else {
            return '#D9534F'
        }
      }]
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yaxis: {
      show: false, 
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <ReactApexcharts type='bar' height={205} options={options} series={[{name: "Week X", data: [1, 1, 2, 1, 0, 1, 1] }]} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
