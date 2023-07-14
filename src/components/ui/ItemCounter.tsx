import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props{
    cantidadItems:number
}

export const ItemCounter = ({cantidadItems}:Props) => {
  return (
    <Box display="flex" alignItems='center'>
        <IconButton>
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{width:40,textAlign:'center'}} >{cantidadItems}</Typography>
        <IconButton>
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
