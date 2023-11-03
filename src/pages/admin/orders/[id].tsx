import { CardList, OrderSummary } from "@/components/cart"
import { AdminLayout } from "@/components/layouts"
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material"
import { GetServerSideProps } from 'next'
import { getSession } from "next-auth/react";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";


interface Props {
    order: IOrder
}

export const AdminOrderPage = ({ order }: Props) => {




    return (
        <AdminLayout title={`Administración - Resumen de la orden`} subTitle={`Order Id:  ${order._id}`}>

            {!order.isPaid
                ? <Chip
                    sx={{ my: 2 }}
                    label='Pendiente de pago'
                    variant='outlined'
                    color="error"
                    icon={<CreditCardOffOutlined />}
                />
                :
                <Chip
                    sx={{ my: 2 }}
                    label='Orden Pagada'
                    variant='outlined'
                    color="success"
                    icon={<CreditScoreOutlined />}
                />
            }
            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CardList editable={false} orderItems={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle1">Direccion de entrega</Typography>
                            </Box>

                            <Typography>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                            <Typography>{order.shippingAddress.address1}</Typography>
                            {order.shippingAddress.address1 && <Typography>{order.shippingAddress.address2}</Typography>}
                            <Typography>{order.shippingAddress.city} {order.shippingAddress.zipCode}</Typography>
                            <Typography>{order.shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />


                            <OrderSummary orderData={order} />



                            {<Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                                {!order.isPaid
                                    ? (
                                        <Chip
                                            sx={{ my: 2 }}
                                            label='Pendiente de pago'
                                            variant='outlined'
                                            color="error"
                                            icon={<CreditCardOffOutlined />}
                                        />
                                    )
                                    :
                                    (<Chip
                                        sx={{ my: 2 }}
                                        label='Orden Pagada'
                                        variant='outlined'
                                        color="success"
                                        icon={<CreditScoreOutlined />}
                                    />)
                                }
                            </Box>}
                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query
    // const session: any = await getSession({ req })
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: `/auth/login?p=/orders/${id}`,
    //             permanent: false
    //         }
    //     }
    // }

    const order = await dbOrders.getOrderById(id as string)


    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false
            }
        }
    }
    // //console.log(session.user.id,'-',order.user)
    // if (order.user !== session.user._id) {
    //     return {
    //         redirect: {
    //             destination: `/orders/history`,
    //             permanent: false
    //         }
    //     }
    // }

    return {
        props: {
            order
        }
    }
}

export default AdminOrderPage