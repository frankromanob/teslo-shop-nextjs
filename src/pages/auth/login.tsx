
import { tesloApi } from '@/api';
import { AuthLayout } from '@/components/layouts'
import { AuthContext } from '@/context';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {

    const {loginUser,isLoggedIn} = useContext(AuthContext)
    const router = useRouter()

    type FormData = {
        email: string
        password: string
    }

    const [showError, setShowError] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()


    const onLogin = async ({ email, password }: FormData) => {
        setShowError(false)

        const isValidLogin= await loginUser(email,password)

        if(!isValidLogin){
            setShowError(true)
            setTimeout(() => setShowError(false), 2000)
            return
        }
         
        router.replace('/')
        // try {

        //     const { data } = await tesloApi.post('/user/login', { email, password })
        //     console.log(data.token, '-', data.user)
        //     Cookies.set('token', data.token)
        // } catch (error) {
        //     console.log('error de clave')
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 2000)
        // }


    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLogin)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }} >
                    <Grid container spacing={2} display='flex' justifySelf='center'>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
                            {showError && <Chip
                                label="Usuario/Clave desconocido"
                                color='warning'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                style={{ display: 'flex' }}/>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type='email' label='Correo' variant='filled' fullWidth
                                {...register('email', {
                                    required: 'El correo es requerido',
                                    validate: (val) => validations.isEmail(val)
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Contraseña' variant='filled' type='password' fullWidth
                                {...register('password', {
                                    required: 'Debe especificar una contraseña',
                                    minLength: { value: 6, message: 'Minimo de 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size='medium' fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href='/auth/register' passHref legacyBehavior>
                                <Link underline='always'>
                                    No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


export default LoginPage