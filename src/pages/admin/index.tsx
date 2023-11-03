import { tesloApi } from '@/api'
import { SummaryTile } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useSWR from 'swr'

export const DashboardPage = () => {

    interface DashboardDataResponse {
        totalOrders: number
        paidOrders: number
        unpaidOrders: number
        totalClients: number //role: client
        totalProducts: number
        productosWithoutInventory: number // 0
        lowInventory: number //productos con menos de 10
    }
    const { data, error } = useSWR<DashboardDataResponse>('api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    if (!error && !data) {
        return <></>
    }
    if (error) {
        return <Typography>Error al cargar información</Typography>
    }


    const {
        totalOrders,
        paidOrders,
        unpaidOrders,
        totalClients,
        totalProducts,
        productosWithoutInventory,
        lowInventory
    } = data!




    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadisticas generales'}
            icon={<DashboardOutlined />}
        >

            <Grid container spacing={2}>
                <SummaryTile title={totalOrders} subTitle={'Total de ordenes'} icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={paidOrders} subTitle={'Ordenes pagadas'} icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={unpaidOrders} subTitle={'Ordenes pendientes'} icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={totalClients} subTitle={'Clientes'} icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={totalProducts} subTitle={'Productos'} icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={productosWithoutInventory} subTitle={'Sin existencia'} icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={lowInventory} subTitle={'Bajo inventario'} icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />} />
                <SummaryTile title={refreshIn} subTitle={'Actualización en:'} icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />} />
            </Grid>

        </AdminLayout>
    )
}


export default DashboardPage