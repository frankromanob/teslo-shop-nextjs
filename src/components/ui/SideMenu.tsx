import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, Person2Outlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { UiContext } from "../../context";
import { useContext, useState } from 'react';
import { useRouter } from "next/router";

export const SideMenu = () => {
    const { isMenuOpen, toogleSideMenu } = useContext(UiContext)
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState("")

    const onSearchTerm=()=>{
        if(searchTerm.trim().length===0) return;
        navigateSideMenu(`/search/${searchTerm}`)
    }

    const navigateSideMenu = (url: string) => {
        toogleSideMenu()
        router.push(url)
    }

    return (
        <Drawer
            open={isMenuOpen}
            onClose={toogleSideMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }} >
                <List>
                    <ListItem>
                        <Input
                            autoFocus
                            type='text'
                            value={searchTerm}
                            onChange={(e)=>setSearchTerm(e.target.value)}
                            placeholder="Buscar..."
                            onKeyPress={
                                (e)=> e.key==='Enter'
                                    ? onSearchTerm()
                                    : null}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={()=>onSearchTerm()}
                                   >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItemButton onClick={toogleSideMenu} >
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItemButton>

                    <ListItemButton onClick={toogleSideMenu} >
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItemButton>



                    <ListItemButton onClick={() => navigateSideMenu('/category/men')}
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItemButton>


                    <ListItemButton onClick={() => navigateSideMenu('/category/women')}
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>

                        <ListItemText primary={'Mujeres'} />
                    </ListItemButton>


                    <ListItemButton onClick={() => navigateSideMenu('/category/children')}
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>

                        <ListItemText primary={'Niños/Niñas'} />
                    </ListItemButton>



                    <ListItemButton onClick={() => navigateSideMenu('/category/unisex')}
                        sx={{ display: { xs: '', sm: 'none' } }}
                    >
                        <ListItemIcon>
                            <Person2Outlined />
                        </ListItemIcon>

                        <ListItemText primary={'Unisex'} />
                    </ListItemButton>


                    <ListItemButton onClick={toogleSideMenu} >
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItemButton>

                    <ListItemButton onClick={toogleSideMenu}>
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItemButton>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItemButton onClick={toogleSideMenu} >
                        <ListItemIcon>
                            <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItemButton>
                    <ListItemButton onClick={toogleSideMenu} >
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItemButton>

                    <ListItemButton onClick={toogleSideMenu}>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer >
    )
}

export default SideMenu