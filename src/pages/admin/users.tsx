import { AdminLayout } from "@/components/layouts"
import { IUser } from "@/interfaces"
import { PeopleOutline } from "@mui/icons-material"
import { Grid, MenuItem, Select } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useSWR from "swr"
import { tesloApi } from "@/api";
import { useEffect, useState } from "react";


export const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users')

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (data) {
            setUsers(data)
        }
    }, [data])


    if (!data && !error) return <></>

    const onRoleChange = async (userId: string, newRole: string) => {

        const previousUsers = users.map(user => ({ ...user }))
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updatedUsers)
        try {
            await tesloApi.put('/admin/users', { userId, role: newRole })
        } catch (error) {
            setUsers(previousUsers)
            alert('No fue posible actualizar el rol')
        }
    }

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 200 },
        { field: 'name', headerName: 'Nombre', width: 300 },
        {
            field: 'role', headerName: 'Rol', width: 200, renderCell: ({ row }) => {
                return (
                    <Select
                        value={row.role} label='Rol' sx={{ width: 300 }}
                        onChange={(event) => onRoleChange(row.id, event.target.value)}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                        <MenuItem value='SEO'> SEO </MenuItem>
                    </Select>
                )
            }
        }
    ]


    return (
        <AdminLayout title={"Usuarios"} subTitle={"Mantenimiento de usuarios"} icon={<PeopleOutline />}>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}

                    />
                </Grid>
            </Grid>

        </AdminLayout>
    )
}


export default UsersPage