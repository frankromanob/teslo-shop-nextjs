import { ShopLayout } from "@/components/layouts"
import { Box, Typography } from "@mui/material"


export default function Custom404()  {
  return (
    <ShopLayout title={"Page not found"} pageDescription={"Nos perdimos | Página no encontrada"}>
        <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)' sx={{flexDirection:{xs:'column', sm:'row'}}}  >
          <Typography variant="h1" component='h1' fontSize={75} fontWeight={200}>404 |</Typography>
          <Typography marginLeft={2}>Pagina no encontrada</Typography>
        </Box>
    </ShopLayout>
  )
}
