import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

import { CartContext, UiContext } from "@/context";

export const Navbar = () => {
    const { asPath, push } = useRouter()

    const { isMenuOpen, toogleSideMenu } = useContext(UiContext)

    const { cart,numberOfItems } = useContext(CartContext)

    const [searchTerm, setSearchTerm] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`)
    }

    // const cantidadItems = () => {
    //     let cant = 0
    //     if (cart.length > 0) {
    //         for (var i = 0; i < cart.length; i++) {
    //             cant += cart[i].quantity
    //         }
    //     }
    //     return cant
    // }



    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6' >Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop (Demo by RomApps)</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Box sx={{ display: isSearching ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'
                >
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'} >Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/children' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/children' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/unisex' passHref legacyBehavior>
                        <Link>
                            <Button color={asPath === '/category/unisex' ? 'primary' : 'info'}>Unisex</Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />


                {
                    isSearching
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className="fadeIn"
                                autoFocus
                                type='text'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar..."
                                onKeyPress={
                                    (e) => e.key === 'Enter'
                                        ? onSearchTerm()
                                        : null}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearching(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                onClick={() => setIsSearching(true)}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )

                }


                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toogleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems<10?numberOfItems:'+9'} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toogleSideMenu}>Menu</Button>
            </Toolbar>
        </AppBar>
    )
}


export default Navbar