import { CardList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import NextLink from "next/link";


export const OrderPage = () => {
    return (
        <ShopLayout title={"Resumen de la orden 2345"} pageDescription={"Resumen de la orden"}>
            <Typography variant='h1' component='h1'>Orden: 23452</Typography>

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color="error"
                icon={<CreditCardOffOutlined />}
            /> */}
            <Chip
                sx={{ my: 2 }}
                label='Orden Pagada'
                variant='outlined'
                color="success"
                icon={<CreditScoreOutlined />}
            />
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

                            <Box sx={{ mt: 3 }}>
                                <h1 >Pagar</h1>
                            </Box>
                            <Chip
                                sx={{ my: 2 }}
                                label='Orden Pagada'
                                variant='outlined'
                                color="success"
                                icon={<CreditScoreOutlined />}
                            />
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage