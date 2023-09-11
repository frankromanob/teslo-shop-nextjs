import { initialData } from "@/database/products"
import { Link, CardActionArea, CardMedia, Grid, Typography, Box, Button } from "@mui/material"

import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { useContext } from "react";
import { CartContext } from "@/context";

// const productsInCart = [
//     initialData.products[1],
//     initialData.products[7],
//     initialData.products[9]
// ]



interface Props {
    editable: boolean
}

const selectedQuantity = (quantity: number) => {
    // setTempCartProduct(cart => ({
    //   ...cart,
    //   quantity
    // }))
}

export const CardList = ({ editable = false }: Props) => {

    const { cart } = useContext(CartContext)

    return (
        <>
            {
                cart.map(product => (
                    <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
                        <Grid item xs={3} columns={2} flex='1' flexDirection='row'>
                            <NextLink href="/product/slug" passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '10px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1" >{product.title}</Typography>
                                <Typography variant="body1" >Talla: {product.size}</Typography>
                                {
                                    editable
                                        ? <ItemCounter cantidadItems={product.quantity} maxValue={product.inStock} onSelectedQuantity={(quantiy) => selectedQuantity(quantiy)} />
                                        : <Typography variant="h6">2 items</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1" >{`$${product.price}`}</Typography>
                            {
                                editable &&
                                (<Button variant="text" color="secondary">Eliminar</Button>)
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
