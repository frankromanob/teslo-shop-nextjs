import { Box } from "@mui/material"
import { Main } from "next/document"
import Head from "next/head"
import { PropsWithChildren } from 'react';

interface Props{
    title:string
}

export const AuthLayout = ({title,children}:PropsWithChildren<Props>) => {
  return (
    <>
        <Head>
            <title>
                {title}
            </title>
        </Head>
        <main>
            <Box display='flex' justifyContent='center' alignContent='center' alignItems='center' height="calc(100vh - 200px)">
                {children}
            </Box>
        </main>
    </>
  )
}

export default AuthLayout
