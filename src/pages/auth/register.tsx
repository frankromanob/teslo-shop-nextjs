
import { AuthLayout } from '@/components/layouts'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from "next/link";


export const RegisterPage = () => {
    return (
        <AuthLayout title={'Registrarse'}>
            <Box sx={{ width: 350, padding: '10px 20px' }} >
                <Grid container spacing={2} display='flex' justifySelf='center'>
                    <Grid item xs={12} justifyContent='center'>
                        <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Nombre completo' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Correo' variant='filled' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Contraseña' variant='filled' type='password' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label='Confirmar contraseña' variant='filled' type='password' fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <NextLink href='/auth/login' passHref legacyBehavior>
                            <Button color='secondary' className='circular-btn' size='large' fullWidth>
                                Registrarse
                            </Button>
                        </NextLink>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref legacyBehavior>
                        <Link underline='always'>
                            Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}


export default RegisterPage