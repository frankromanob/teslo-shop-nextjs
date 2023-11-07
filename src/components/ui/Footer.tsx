import { Box, Divider, Grid, Link, Typography } from "@mui/material"
import { useRouter } from "next/router"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';




export const FooterPage = () => {
    const routes = [
        { name: "Inicio", link: "/" },
        { name: "Ver carrito", link: "/cart" },
        { name: "Mis ordenes", link: "/orders/history" }
    ]
    // { name: "Hombres", link: "/category/men" },
    // { name: "Mujeres", link: "/category/women" },
    // { name: "Niños", link: "/category/kids" },
    // { name: "Unisex", link: "/category/unisex" },
    const redes = [
        { name: "X", link: "https://twitter.com/romanobfrank", icon:<TwitterIcon/> },
        { name: "LinkedIn", link: "https://www.linkedin.com/in/francisco-romano-batista/", icon:<LinkedInIcon/> },
        { name: "GitHub", link: "https://github.com/frankromanob", icon:<GitHubIcon/> },
    ]
    //const classes = useStyles();
    const path = routes;
    const router = useRouter();
    return (
        < >
            <Divider />
            <Box display='flex' flexDirection='row' justifyContent='space-between'>

                <Box display='flex' flexDirection='column'>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            margin: '2px',
                            marginInlineStart: '40px'
                        }}
                    >
                        Menu principal:
                    </Typography>
                    <Grid container justifyContent='center' display='flex' flexDirection='column' marginInlineStart='50px' >
                        {path.map(({ name, link }) => (
                            <Grid item key={link}>
                                <Link href={link}>
                                    <Typography style={{ fontWeight: 'lighter', margin: '1px', color:'secondary' }}>
                                        {name}
                                    </Typography>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box display='flex' flexDirection='column'>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            borderWidth: '1px',
                            margin: '2px',
                            marginInlineStart: '20px',
                            color:'primary'
                        }}
                    >
                        Redes sociales:
                    </Typography>
                    <Grid container justifyContent='center' display='flex' flexDirection='row' marginInlineEnd='50px' >
                        {redes.map(({ name, link,icon }) => (
                            <Grid item key={link} margin='5px'>
                                <Link href={link} target="_blank">
                                    {icon}
                                    {/* <Typography style={{  margin: '1px', color:'primary'}}>
                                        {name}
                                    </Typography> */}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Grid
                item
                container
                component={"a"}
                target="_blank"
                rel="noreferrer noopener"
                href="https://github.com/frankromanob"
                justifyContent="center"
                style={{
                    textDecoration: "none",
                }}
            >
                <Typography >
                    &copy;RomApps 2023
                </Typography>
            </Grid>
        </>

    )
}

export default FooterPage