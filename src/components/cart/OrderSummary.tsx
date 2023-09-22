import { CartContext } from "@/context";
import { Grid, Typography } from "@mui/material"
import { useContext } from "react";
import {currency} from '@/utils'


export const OrderSummary = () => {

    const { tax,total,subTotal,numberOfItems } = useContext(CartContext)


    // const [orderSummary, setOrderSummary] = useState({
    //     productos: 0,
    //     subtotal: 0,
    //     tax: 0,
    //     total: 0
    // })


    // useEffect(() => {
    //     let summary = {
    //         productos: 0,
    //         subtotal: 0,
    //         tax: 0,
    //         total: 0
    //     }
    //     summary.productos = 0
    //     summary.subtotal = 0
    //     summary.tax = 0
    //     summary.total = 0

    //     if (cart.length > 0) {
    //         for (var i = 0; i < cart.length; i++) {
    //             summary.productos += cart[i].quantity
    //             summary.subtotal += (cart[i].price* cart[i].quantity)
    //             summary.tax += (cart[i].price* cart[i].quantity* 0.1)
    //         }
    //         summary.total += (summary.subtotal + summary.tax)
    //     }
    //     setOrderSummary(summary)
    // }, [cart])



    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ marginTop: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{ marginTop: 2 }} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{currency.format(total)}</Typography>
            </Grid>
        </Grid>
    )
}

export default OrderSummary;