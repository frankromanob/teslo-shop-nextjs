import { createContext } from 'react';

export interface contextProps {
    isMenuOpen:boolean;
    toogleSideMenu: () => void;
}

export const UiContext = createContext({} as contextProps);