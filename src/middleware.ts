import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


    const validRoles = ['admin', 'SEO']
    const requestedPage = req.nextUrl.pathname;
    console.log(requestedPage)
    if (session) {
        switch (requestedPage) {
            case '/admin':
                if (!validRoles.includes(session.user.role)) {
                    const url = req.nextUrl.clone()
                    url.pathname = '/'
                    return NextResponse.redirect(url)
                }
                return NextResponse.next()
        }
    } else {
        if(requestedPage=='/api/admin/dashboard'){
            return  new Response(JSON.stringify({message:'Acceso no permitido'}),{
                status:403,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            //NextResponse.json({message:'Acceso no permitido'})
        }
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login'
        url.search = `p=${requestedPage}`
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/checkout/address', '/checkout/summary', '/admin', '/api/admin/dashboard']

}