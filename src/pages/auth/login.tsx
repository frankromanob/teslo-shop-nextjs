
import { AuthLayout } from '@/components/layouts'
import { GetServerSideProps } from 'next'
import { AuthContext } from '@/context';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material'
import { getSession, signIn, useSession, getProviders } from 'next-auth/react';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {

    // const { loginUser, isLoggedIn } = useContext(AuthContext)
    const router = useRouter()

    // const sessions = useSession()

    type FormData = {
        email: string
        password: string
    }

    const [showError, setShowError] = useState(false)

    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()


    const onLogin = async ({ email, password }: FormData) => {
        setShowError(false)

        // const isValidLogin = await loginUser(email, password)

        // if (!isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 2000)
        //     return
        // }
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination)
        // try {

        //     const { data } = await tesloApi.post('/user/login', { email, password })
        //     console.log(data.token, '-', data.user)
        //     Cookies.set('token', data.token)
        // } catch (error) {
        //     console.log('error de clave')
        //     setShowError(true)
        //     setTimeout(() => setShowError(false), 2000)
        // }

        await signIn('credentials', { email, password })
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
                                style={{ display: 'flex' }} />
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
                            {/* <Button color='secondary' size='small' fullWidth
                                onClick={() => { signIn() }}
                            >
                                OAUTH
                            </Button> */}
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref legacyBehavior>
                                <Link underline='always'>
                                    No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {
                                    if(provider.id==='credentials') return(<div key='credentials'></div>)
                                    return (
                                        <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


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

export default LoginPage