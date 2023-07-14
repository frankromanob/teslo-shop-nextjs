
import { ShopLayout } from '@/components/layouts'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import { Inter } from 'next/font/google'
import { initialData } from "../database/products";
import { ProductList } from '@/components/products';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ShopLayout title='Teslo Shop - Home Page' pageDescription={'Pagina principal de la tienda'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{mb:1}} >Todos los productos</Typography>

    <ProductList products={initialData.products as any}/>

    </ShopLayout>
  )
}
