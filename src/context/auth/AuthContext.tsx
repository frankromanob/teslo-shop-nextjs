import { IUser } from '@/interfaces';
import { createContext } from 'react';

export interface authContextProps {
    isLoggedIn:boolean;
    user?:IUser;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (email: string, password: string, name: string) => Promise<{hasError:boolean; message?:string}>
}

export const AuthContext = createContext({} as authContextProps);