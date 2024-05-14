import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterOptions, User} from "../../types";

export interface UiState {
    loggedIn: boolean,
    user?: User,
    filter: FilterOptions
}

const initialState: UiState = {
    loggedIn: false,
    filter: {}
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload;
        },
    },
})

export const {
    setUserLoggedIn,
    setUser
} = uiSlice.actions

export default uiSlice.reducer