import { IUser } from '@/interfaces';
import { createContext } from 'react';

export interface authContextProps {
    isLoggedIn:boolean;
    user?:IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string ) => Promise<{hasError:boolean; message?:string}>
    logoutUser: () => Promise<void>
}

export const AuthContext = createContext({} as authContextProps);