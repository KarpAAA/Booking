import {RouterProvider} from "react-router-dom";
import React, {useEffect} from "react";
import {router} from "./index";
import {useVerifyUserQuery} from "./store/api";
import {useDispatch} from "react-redux";
import {setUser, setUserLoggedIn} from "./store/slices/uiSlice";


export const App = () => {
    const dispatch = useDispatch();
    const {data: user} = useVerifyUserQuery();
    useEffect(() => {
        if(user){
            dispatch(setUser(user));
            dispatch(setUserLoggedIn(true));
        }
    }, [user]);


    return  (
        <RouterProvider router={router}/>
    )
}