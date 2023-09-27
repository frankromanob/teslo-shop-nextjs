import { Button } from '@mui/material'
import React from 'react'

export const CalcButton = (val:string) => {
    return (
        <div>
            <Button sx={{width:50, height:50}} color='secondary'  size='small'>
                {val}
            </Button>
        </div>
    )
}
