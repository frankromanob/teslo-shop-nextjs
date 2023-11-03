import { Link, CardActionArea, CardMedia, Grid, Typography, Box, Button } from "@mui/material"

import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { useContext } from "react";
import { CartContext } from "@/context";
import { ICartProduct, IOrderItem } from "@/interfaces";



interface Props {
    editable: boolean,
    orderItems?: IOrderItem[]
}



export const CardList = ({ editable = false, orderItems }: Props) => {


    const { cart, updateCartQuantity, removeProductInCart } = useContext(CartContext)


    const selectedQuantity = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity
        updateCartQuantity(product)
    }

    const removeItem = (product: ICartProduct) => {
        removeProductInCart(product)
    }

    const productsToShow = orderItems ? orderItems : cart
    return (
        <>
            {
                productsToShow.map(product => (
                    <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug + product.size}>
                        <Grid item xs={3} columns={2} flex='1' flexDirection='row'>
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`${product.image}`}
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
                                        ? <ItemCounter
                                            cantidadItems={product.quantity}
                                            maxValue={5}
                                            onSelectedQuantity={(newQuantity) => selectedQuantity(product as ICartProduct, newQuantity)} />
                                        : <Typography variant="h6">{product.quantity}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant="subtitle1" >{`$${product.price}`}</Typography>
                            {
                                editable &&
                                (<Button variant="text"
                                    color="secondary"
                                    onClick={() => removeItem(product as ICartProduct)}
                                >Eliminar</Button>)
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
