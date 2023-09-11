import { PropsWithChildren, useReducer } from 'react';
import { uiReducer, UiContext } from './';

export interface UiState {
    isMenuOpen: boolean,
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}

export const UiProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toogleSideMenu=()=>{
        dispatch({type:'[UI] - ToogleMenu'})
    }
    return (
        <UiContext.Provider value={{
            ...state,
            toogleSideMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}
