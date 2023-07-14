import { IProduct } from '@/interfaces'
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import  { useMemo, useState } from 'react'
import NextLink from "next/link";

interface Props {
    product: IProduct;
}

export const ProductCard = ({ product }: Props) => {

    const [isHovered, setIsHovered] = useState(false)

    const productImage = useMemo(() => {
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`
    }, [isHovered, product.images])

    return (
        <Grid
            item xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <NextLink href='/product/slug' passHref legacyBehavior>
                    <Link>
                        <CardActionArea>
                            <CardMedia
                                component='img'
                                className='fadeIn'
                                image={productImage}
                                alt={product.title}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={{ mt: 1 }} className='fadeIn'  >
                <Typography fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={200}>{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}
