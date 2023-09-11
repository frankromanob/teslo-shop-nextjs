import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid   container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${150.5}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos (10%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{`$${15.05}`}</Typography>
        </Grid>
        <Grid item xs={6} sx={{marginTop:2}}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{marginTop:2}} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{`$${155.55}`}</Typography>
        </Grid>
    </Grid>
  )
}

export default OrderSummary;