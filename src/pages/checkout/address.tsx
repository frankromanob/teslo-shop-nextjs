
import { ShopLayout } from "@/components/layouts"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { jwt, countries } from '@/utils'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { CartContext } from '../../context/cart/CartContext';
import { useContext, useEffect } from "react"



export const AddressPage = () => {

    const router = useRouter()
    const { updateAddress } = useContext(CartContext)

    type FormData = {
        firstName: string
        lastName: string
        address1: string
        address2?: string
        zipCode: string
        country: string
        city: string
        phone: string
    }

    const getAddressFromCookies = (): FormData => {

        const dirFromCookie = Cookies.get('teslo-dir')
        //console.log('cookie: ',dirFromCookie)
        if (dirFromCookie) {
            return JSON.parse(dirFromCookie)
        } else {
            return {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                zipCode: '',
                country: 'DOM',
                city: '',
                phone: '',
            }
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    })

    useEffect(() => {
        reset(getAddressFromCookies())
    }, [reset])


    const onSubmitAddress = (data: FormData) => {
        Cookies.set('teslo-dir', JSON.stringify(data))
        updateAddress(data)
        router.push('/checkout/summary')
    }

    return (
        <ShopLayout title={"Dirección"} pageDescription={"Confirmar dirección del destino"}>
            <form onSubmit={handleSubmit(onSubmitAddress)}>

                <Typography variant="h1" component='h1'>Dirección</Typography>
                <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Nombre' variant="filled" fullWidth
                            {...register('firstName', {
                                required: 'Debe especificar un nombre',
                                minLength: { value: 2, message: 'Minimo de 2 caracteres' }
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Apellido' variant="filled" fullWidth
                            {...register('lastName', {
                                required: 'Debe especificar un apellido',
                                minLength: { value: 2, message: 'Minimo de 2 caracteres' }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Dirección' variant="filled" fullWidth
                            {...register('address1', {
                                required: 'Debe especificar una dirección'
                            })}
                            error={!!errors.address1}
                            helperText={errors.address1?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Dirección 2 (opcional) ' variant="filled" fullWidth
                            {...register('address2')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Código Postal' variant="filled" fullWidth
                            {...register('zipCode', {
                                required: 'Debe especificar un código postal'
                            })}
                            error={!!errors.zipCode}
                            helperText={errors.zipCode?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Ciudad' variant="filled" fullWidth
                            {...register('city', {
                                required: 'Debe especificar una ciudad'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Pais</InputLabel>
                            <Select
                                variant="filled"
                                label="Pais"
                                defaultValue={getAddressFromCookies().country || 'DOM'}
                                {...register('country', {
                                    required: 'Debe especificar un país'
                                })}
                                error={!!errors.country}
                            //helperText={errors.country?.message}
                            >
                                {
                                    countries.map(country => (
                                        <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>

                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Teléfono' variant="filled" fullWidth
                            {...register('phone', {
                                required: 'Debe especificar un teléfono'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}




// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     const { token = '' } = ctx.req.cookies
//    // let userId = ''
//     let isValidToken = false

//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true
//     } catch (error) {
//         isValidToken = false
//     }

//     if (!isValidToken){
//         return{
//             redirect:{
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent:false
//             }
//         }
//     }
//     return {
//         props: {

//         }
//     }
// }

export default AddressPage