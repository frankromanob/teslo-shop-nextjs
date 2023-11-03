import { ShopLayout } from '@/components/layouts'
import { Button, Chip, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import NextLink from "next/link";
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';
import { currency } from '@/utils';


interface Props {
    userId: string;
    orders?: IOrder[]
}

export const HistoryPage: NextPage<Props> = ({ userId, orders }) => {

    // console.log(userId)

    // if (!orders) {
    //     return (<h1>Nada</h1>)
    // }

    // console.log(orders)
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 240 },
        { field: 'fullName', headerName: 'Nombre completo', width: 250, sortable: false },
        { field: 'total', headerName: 'Monto', width: 100 },
        {
            field: 'paid',
            headerName: 'Pagada',
            width: 200,
            renderCell: (params) => {
                return (
                    params.row.paid
                        ? <Chip color="success" label="Pagada" variant='outlined' />
                        : <Chip color="error" label="No pagada" variant='outlined' />
                )
            }
        },
        {
            field: 'orden',
            headerName: 'Ver Orden',
            width: 200,
            sortable: false,
            renderCell: (params) => {
                return (
                    <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
                        <Button variant='outlined' color="primary" className="circular-btn">
                            Ver
                        </Button>
                    </NextLink>
                )
            }
        }
    ];

    // const rows: GridRowsProp = [
    //     { id: 1, paid: false, fullName: 'Hello' },
    //     { id: 2, paid: true, fullName: 'DataGridPro' },
    //     { id: 3, paid: false, fullName: 'MUI' },
    //     { id: 4, paid: false, fullName: 'MUI' },
    //     { id: 5, paid: true, fullName: 'MUI' },
    // ];

    const rows: GridRowsProp = orders!.map((order, idx) => (
        {
            id: idx + 1,
            paid: order.isPaid,
            total: currency.format(order.total),
            fullName: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName,
            orderId: order._id
        }
    ))

    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de las ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}

                    />
                </Grid>
            </Grid>
        </ShopLayout>
    )

}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/history`,
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props: {
            userId: session.user._id,
            orders
        }
    }
}


export default HistoryPage