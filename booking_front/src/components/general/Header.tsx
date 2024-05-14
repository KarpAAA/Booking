import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setUser, setUserLoggedIn} from "../../store/slices/uiSlice";
import {Role} from "../../types";


export const Header = () => {
    const {loggedIn, user} = useSelector((state: RootState) => state.ui)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToMain = () => {
        navigate('/');
    }
    const handleLogOut = () => {
        dispatch(setUser(undefined));
        dispatch(setUserLoggedIn(false));
        localStorage.removeItem('token');
    }
    return (
        <div style={{backgroundColor: '#003B95'}}
             className={'w-full py-3'}
             id={'header'}
        >
            <div className={'flex flex-row m-auto w-4/5 justify-between'}>
                <div className={'text-white text-3xl font-bold'} onClick={() => navigateToMain()}>Booking.com</div>
                <div className={'flex align-middle gap-2'}>

                    {
                        loggedIn && user ?
                            <>
                                <span className={'flex items-center text-white text-md'}>{user?.username}</span>

                                { user.id && user.role === Role.OWNER &&
                                    <button
                                        style={{color: '#003B95'}}
                                        className={'border-solid border-2 bg-white px-5 rounded text-sm'}>
                                        <Link
                                            className={'decoration-0 text-black hover:decoration-0 hover:text-black'}
                                            to={'/ownerships/' + user.id}>
                                            Мої помешкання
                                        </Link>
                                    </button>
                                }
                                { user.id && user.role === Role.USER &&
                                    <button
                                        style={{color: '#003B95'}}
                                        className={'border-solid border-2 bg-white px-5 rounded text-sm'}>
                                        <Link
                                            className={'decoration-0 text-black hover:decoration-0 hover:text-black'}
                                            to={'/reservations/' + user.id}>
                                            Мої бронювання
                                        </Link>
                                    </button>
                                }

                                <button
                                    onClick={handleLogOut}
                                    style={{color: '#003B95'}}
                                    className={'border-solid border-2 bg-white px-5 rounded text-sm'}>
                                    Вийти
                                </button>
                            </>

                            :
                            <>
                                <button
                                    style={{color: '#003B95'}}
                                    className={'border-solid border-2 bg-white px-5 rounded text-sm'}>
                                    <Link
                                        className={'decoration-0 text-black hover:decoration-0 hover:text-black'}
                                        to="/register">
                                        Зареєструвтатись
                                    </Link>
                                </button>

                                <button
                                    style={{color: '#003B95'}}
                                    className={'border-solid border-2 bg-white px-3 rounded text-sm'}>
                                    <Link
                                        className={'decoration-0 text-black hover:decoration-0 hover:text-black'}
                                        to="/login">
                                        Увійти
                                    </Link>
                                </button>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}