import { PropsWithChildren, useEffect, useReducer } from 'react';
import { authReducer, AuthContext } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession,signOut } from 'next-auth/react';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser
}

const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined

}



export const AuthProvider = ({ children }: PropsWithChildren) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
    const router = useRouter()
    const {data, status} = useSession()

    useEffect(() => {
        if(status==='authenticated'){
            dispatch({type: '[Auth] - Login',payload:data.user as IUser})
        }
    }, [status, data])

    // useEffect(() => {
    //     checkToken()
    // }, [])


    const checkToken = async () => {
        const cookieToken = Cookies.get('token');
        //console.log("CT: ",cookieToken)
        if (!cookieToken) return false
        try {
            const { data } = await tesloApi.get('/user/validate-token');
            const { token, user } = data
            dispatch({ type: '[Auth] - Login', payload: user })
            Cookies.set('token', token)
        } catch (error) {
            dispatch({ type: '[Auth] - Logout' })
            Cookies.remove('token')
            return false
        }

    }
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user })
            return true
        } catch (error) {
            return false
        }
    }

    const logoutUser = async () => {
        signOut()
        Cookies.remove('teslocart')
        Cookies.remove('teslo-dir')
        //Cookies.remove('token')
       //router.push('/')
        //router.reload()
        dispatch({ type: "[Auth] - Logout" })
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user })
            return {
                hasError: false,
                message: ''
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo crear el usuario'
            }
        }
    }
    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
