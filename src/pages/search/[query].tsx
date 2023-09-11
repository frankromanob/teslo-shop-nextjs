
import { ShopLayout } from '@/components/layouts'
import { Typography } from '@mui/material'
import { ProductList } from '@/components/products';
import { GetServerSideProps } from 'next'
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';


interface Props {
    products: IProduct[],
    query: string,
    foundProducts: boolean
}
export default function SearchPage({ products, query, foundProducts }: Props) {

    //  const { products, isLoading, isError } = useProducts(`/search/${searchTerm}`)
    //if (isError) return <div>Fallo en la carga de productos.</div>

    return (
        <ShopLayout title='Teslo Shop - Search' pageDescription={'Resultados de la busqueda'}>
            <Typography variant='h1' component='h1'>Busqueda de productos</Typography>
            {
                foundProducts
                    ? <Typography variant='h2' sx={{ mb: 1 }} color="secondary" textTransform='capitalize' >Se buscó: {query}</Typography>
                    :
                    (
                        <>
                            <Typography variant='h2' sx={{ mb: 1 }} color="secondary" >No se encontro producto: {query}</Typography>
                            <Typography variant='h6' sx={{ mb: 1 }} >Sugerencias</Typography>
                        </>
                    )
            }
            <ProductList products={products} />
        </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { query = '' } = ctx.params as { query: string } // your fetch function here

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    let products = await dbProducts.getSearchProducts(query)
    const foundProducts = products.length > 0;

    if (!foundProducts) {
         products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}