import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { FullScreenLoading } from "@/components/ui"
import { useProducts } from "@/hooks"
import { Typography } from "@mui/material"


export const MenPage = () => {
    const { products, isLoading, isError } = useProducts('/products?gender=men')
    if (isError) return <div>Fallo en la carga de productos.</div>

    return (
      <ShopLayout title='Teslo Shop - Categoria Hombres' pageDescription={'Productos para hombres'}>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' sx={{ mb: 1 }} >Productos para hombres</Typography>
        {
          isLoading
            ?<FullScreenLoading />
            :<ProductList products={products} />
        }
      </ShopLayout>
    )
}

export default MenPage