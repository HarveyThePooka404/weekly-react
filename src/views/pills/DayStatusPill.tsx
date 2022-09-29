import { Avatar, Badge, styled } from "@mui/material";
import { Props } from "react-apexcharts";

// ** Styled Components
const BadgeContentSpanTBD = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }))

const BadgeContentSpanGood = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
    }))

const BadgeContentSpanBad = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.error.light,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
  }))


//A Bit boiler platish... can probably be done better in a different way 
export default function DayStatusPill({status, quality}: Props) {
    if(status == "TOBEDONE") {
        return (
            <Badge
            sx={{marginLeft: 5 }}
            overlap='circular'
            badgeContent={<BadgeContentSpanTBD />} />
        )
    } else if (status == "DONE" && quality == "GOOD") {
        return (
            <Badge
            sx={{marginLeft: 5 }}
            overlap='circular'
            badgeContent={<BadgeContentSpanGood />} />
        )
    } else {
        return (
            <Badge
            sx={{marginLeft: 5 }}
            overlap='circular'
            badgeContent={<BadgeContentSpanBad />} />
        )
    }
}