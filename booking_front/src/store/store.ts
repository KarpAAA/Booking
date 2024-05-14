import { configureStore } from '@reduxjs/toolkit'
import uiSlice from "./slices/uiSlice";
import {housesApi} from "./api";

export const store = configureStore({
    reducer: {
        [housesApi.reducerPath]: housesApi.reducer,
        ui: uiSlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(housesApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch