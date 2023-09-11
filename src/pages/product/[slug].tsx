import { ShopLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideShow } from "../../components/products/ProductSlideShow";
import { ItemCounter, ItemSizeSelector } from "@/components/ui";
import { ICartProduct, IProduct, ISize } from "@/interfaces";
import { dbProducts } from "@/database";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useContext, useState } from "react";
import { useRouter } from 'next/router';
import { CartContext } from "@/context";




interface Props {
  product: IProduct
}

export const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter()

  const {onAddItemToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    inStock: product.inStock,
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(tempCartProduct => ({
      ...tempCartProduct,
      size
    }))
  }


  const selectedQuantity = (quantity: number) => {
    setTempCartProduct(tempCartProduct => ({
      ...tempCartProduct,
      quantity
    }))
  }


  const addItemToCart = () => {
    if (!tempCartProduct.size) { return }

    onAddItemToCart(tempCartProduct)
    console.log(tempCartProduct)

    router.push('/cart');
  }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/*Titulos*/}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' >Cantidad</Typography>
              <ItemCounter
                cantidadItems={tempCartProduct.quantity}
                maxValue={product.inStock}
                onSelectedQuantity={(quantiy) => selectedQuantity(quantiy)}
              />

              <ItemSizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={(size) => selectedSize(size)}
              />
            </Box>
            {
              (product.inStock > 0)
                ? (<Button color="primary" className='circular-btn'
                  onClick={()=>addItemToCart()}
                >
                  {
                    tempCartProduct.size
                      ? 'Agregar al carrito'
                      : 'Seleccione una talla'
                  }
                </Button>
                )
                : (
                  <Chip label='No hay disponibles' color="error" variant="outlined" />
                )
            }


            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2' >Descripción</Typography>
              <Typography variant='body2' >{product.description}</Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

///Ejercicio con getServerSideProps
// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   const { slug='' } = ctx.params as { slug: string }

//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


//Ejercicio con getStaticPath y getStaticProps


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async () => {

  const productSlugs = await dbProducts.getAllProductsSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage;