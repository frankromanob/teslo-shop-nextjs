import { CardList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link";


export const SummaryPage = () => {
    return (
        <ShopLayout title={"Resumen de la orden"} pageDescription={"Resumen de la orden"}>
            <Typography variant='h1' component='h1'>Carrito</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CardList editable={false} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle1">Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' legacyBehavior passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography>Francisco Romano</Typography>
                            <Typography>Calle 1</Typography>
                            <Typography>Rep. Alla</Typography>
                            <Typography>Santo Domingo</Typography>
                            <Typography>1 809 809 8099</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' legacyBehavior passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />

                            <Box  sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn">Confirmar orden</Button>
                            </Box>
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage