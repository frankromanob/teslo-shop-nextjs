import { AdminLayout } from '@/components/layouts'
import { IOrder, IUser } from '@/interfaces'
import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import useSWR from 'swr'
import { currency } from '@/utils';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'Orden ID', width: 220 },
    { field: 'email', headerName: 'Correo', width: 220 },
    { field: 'name', headerName: 'Nombre', width: 220 },
    { field: 'total', headerName: 'Monto', width: 100 },
    { field: 'date', headerName: 'Fecha', width:200 },
    { field: 'productos', headerName: 'Productos', align: 'center' },
    {
        field: 'isPaid',
        headerName: 'Pagada',
        width:130,
        renderCell: ({ row }) => {
            return row.isPaid
                ? (<Chip variant='outlined' label='Pagada' color='success' />)
                : (<Chip variant='outlined' label='Pendiente' color='error' />)
        }
    },
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({ row }) => {
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank'>
                    Ver orden
                </a>
            )
        }
    },
]



export const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders')

    if (!data && !error) return <></>
    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: currency.format(order.total),
        isPaid: order.isPaid,
        productos: order.numberOfItems,
        date:order.createdAt
    }))
    return (

        <AdminLayout title={'Ordenes'} subTitle={'Administración de ordenes'} icon={<ConfirmationNumberOutlined />}>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}

                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
}

export default OrdersPage