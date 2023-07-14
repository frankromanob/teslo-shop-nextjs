import { ShopLayout } from "@/components/layouts"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import NextLink from 'next/link';

 const empty = () => {
  return (
    <ShopLayout title={"Carrito de compras vacío"} pageDescription={"No hay articulos"}>
        <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{flexDirection:{xs:'column', sm:'row'}}}  >
          <RemoveShoppingCartOutlined sx={{fontSize:100}}/>
          <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography marginLeft={2}>Su carrito está vacío</Typography>
                <NextLink href='/' passHref legacyBehavior>
                    <Link  typography='h5' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>

          </Box>
        </Box>
    </ShopLayout>
  )
}

export default empty