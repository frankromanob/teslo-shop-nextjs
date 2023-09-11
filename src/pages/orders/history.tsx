import { ShopLayout } from '@/components/layouts'
import { Button, Chip, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams } from '@mui/x-data-grid'
import NextLink from "next/link";

export const HistoryPage = () => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'fullName', headerName: 'Nombre completo', width: 350, sortable:false },
        {
            field: 'paid',
            headerName:'Pagada',
            width:200,
            renderCell: (params: GridValueGetterParams)=>{
                return (
                    params.row.paid
                        ? <Chip color="success" label="Pagada" variant='outlined' />
                        : <Chip color="error" label="No pagada" variant='outlined' />
                )
            }
        },
        {
            field: 'orden',
            headerName:'Ver Orden',
            width:200,
            sortable:false,
            renderCell: (params: GridValueGetterParams)=>{
                return (
                    <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                        <Button variant='outlined'>
                            Ver
                        </Button>
                    </NextLink>
                )
            }
        }
      ];

      const rows: GridRowsProp = [
        { id: 1, paid: false, fullName: 'Hello' },
        { id: 2, paid: true,fullName: 'DataGridPro' },
        { id: 3, paid: false,fullName: 'MUI' },
        { id: 4, paid: false,fullName: 'MUI' },
        { id: 5, paid: true,fullName: 'MUI' },
      ];
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de las ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

        <Grid container>
            <Grid item xs={12} sx={{height:650, width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}

                />
            </Grid>
        </Grid>
    </ShopLayout>
  )

}

export default HistoryPage