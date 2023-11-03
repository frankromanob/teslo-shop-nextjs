import { AdminLayout } from '@/components/layouts'
import { IProduct } from '@/interfaces'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material'
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import useSWR from 'swr'
import { currency } from '@/utils';
import NextLink from 'next/link';

{/* <Box component="img"
sx={{height: 100,width: 80}}
src={`/products/${row.value}`}
/> 
 <img src={`/products/${row.img}`} alt={row.title} width='50' height='50' />
*/}

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({ row }) => {
            return (
                <a href={`/product/${row.slug}`} target='_blank'>
                    <CardMedia
                        component='img'
                        className='fadeIn'
                        image={`${row.img}`}
                    />
                </a>
            )
        },

    },
    {
        field: 'title', headerName: 'Producto', width: 350,
        renderCell: ({ row }) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref legacyBehavior>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'gender', headerName: 'Género', width: 100 },
    { field: 'type', headerName: 'Tipo', width: 120 },
    { field: 'inStock', headerName: 'Existencia', width: 100, align: 'center' },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'sizes', headerName: 'Tallas', width: 200 },
    // {
    //     field: 'isPaid',
    //     headerName: 'Pagada',
    //     width:130,
    //     renderCell: ({ row }) => {
    //         return row.isPaid
    //             ? (<Chip variant='outlined' label='Pagada' color='success' />)
    //             : (<Chip variant='outlined' label='Pendiente' color='error' />)
    //     }
    // },
]


export const ProductsPage
    = () => {

        const { data, error } = useSWR<IProduct[]>('/api/admin/products')

        if (!data && !error) return <></>

        const rows = data!.map(product => ({
            id: product._id,
            img: product.images[0],
            title: product.title,
            gender: product.gender,
            type: product.type,
            inStock: product.inStock,
            price: currency.format(product.price),
            sizes: product.sizes.join(', '),
            slug: product.slug
        }))

        return (

            <AdminLayout title={`Productos (${data?.length})`} subTitle={'Administración de Productos'} icon={<CategoryOutlined />}>

                <Box display='flex' justifyContent='end' sx={{mb:1}} >
                    <Button
                        startIcon={<AddOutlined/>}
                        color='secondary'
                        href='/admin/products/new'
                    >
                        Crear Producto
                    </Button>

                </Box>
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

export default ProductsPage
