
import { AuthLayout } from '@/components/layouts'
import { AuthContext } from '@/context';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';


export const RegisterPage = () => {

    type FormData = {
        email: string
        password: string
        repeatPassword: string
        name: string
    }
    const router = useRouter()
    const { registerUser } = useContext(AuthContext)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()


    const onRegister = async ({ name, email, password, repeatPassword }: FormData) => {
        setShowError(false)
        if (password !== repeatPassword) {
            setErrorMsg('La contraseña no coincide')
            setShowError(true)
            setTimeout(() => setShowError(false), 2000)
            return false
        }
        const resp = await registerUser(name, email, password);

        if (resp.hasError) {
            setShowError(true)
            setErrorMsg(resp.message || '')
            setTimeout(() => setShowError(false), 2000)
            return
        }

        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination)

        await signIn('credentials', { email, password });
        // try {

        //     const { data } = await tesloApi.post('/user/register', { email, password, name })
        //     console.log(data.token, '-', data.user)
        //     Cookies.set('token', data.token)
        // } catch (error) {
        //     setErrorMsg("Ha ocurrido un error")
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 2000)
        // }


    }


    return (

        <AuthLayout title={'Registrarse'}>
            <form onClick={handleSubmit(onRegister)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }} >
                    <Grid container spacing={2} display='flex' justifySelf='center'>
                        <Grid item xs={12} justifyContent='center'>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            {showError && <Chip
                                label={errorMsg}
                                color='warning'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                style={{ display: 'flex' }} />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Nombre completo' variant='filled' fullWidth
                                {...register('name', {
                                    required: 'Debe especificar su nombre',
                                    minLength: { value: 2, message: 'Muy corto' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}

                            />
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
                            <TextField label='Confirmar contraseña' variant='filled' type='password' fullWidth
                                {...register('repeatPassword', {
                                    required: 'Confirme su contraseña',
                                    minLength: { value: 6, message: 'Minimo de 6 caracteres' },
                                })}
                                error={!!errors.repeatPassword}
                                helperText={errors.repeatPassword?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                                Registrarse
                            </Button>

                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref legacyBehavior>
                                <Link underline='always'>
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {


    const session = await getSession({ req })
    const { p = '/' } = query
    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
        }
    }
}

export default RegisterPage