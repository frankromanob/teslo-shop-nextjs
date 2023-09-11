import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props {
  cantidadItems: number,
  onSelectedQuantity: (quantiy: number) => void,
  maxValue: number
}

export const ItemCounter = ({ cantidadItems, onSelectedQuantity, maxValue }: Props) => {
  return (
    <Box display="flex" alignItems='center'>
      <IconButton onClick={() => cantidadItems > 1 ? onSelectedQuantity(--cantidadItems) : cantidadItems}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }} >{cantidadItems}</Typography>
      <IconButton onClick={() => cantidadItems < maxValue ? onSelectedQuantity(++cantidadItems) : cantidadItems}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
