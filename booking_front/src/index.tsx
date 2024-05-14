import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'rsuite/dist/rsuite.min.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {MainPage} from "./components/pages/MainPage";
import {LoginPage} from "./components/pages/LoginPage";
import {HousePage} from "./components/pages/HousePage";
import {store} from "./store/store";
import {Provider} from 'react-redux'
import {App} from "./App";
import {MyApartmentsPage} from "./components/pages/MyApartmentsPage";
import {CreateNewApartmentPage} from "./components/pages/CreateNewApartmentPage";
import {MyReservationsPage} from "./components/pages/MyReservationsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <LoginPage/>,
    },
    {
        path: "/house/:id",
        element: <HousePage/>,
    },
    {
        path: "/ownerships/:userId",
        element: <MyApartmentsPage/>,
    },
    {
        path: "/reservations/:userId",
        element: <MyReservationsPage/>,
    },
    {
        path: "/apartment/new",
        element: <CreateNewApartmentPage/>,
    },
    {
        path: "/apartment/edit/:id",
        element: <CreateNewApartmentPage edit={true}/>,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App></App>
        </Provider>,
    </React.StrictMode>
);

reportWebVitals();
