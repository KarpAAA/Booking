import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Header} from "../general/Header";
import {CustomInput} from "../general/CustomInput";
import {CustomButton} from "../general/CustomButton";
import {useLoginToAccountMutation, useRegisterMutation} from "../../store/api";
import {Role} from "../../types";
import {useDispatch} from "react-redux";
import {setUser, setUserLoggedIn} from "../../store/slices/uiSlice";


export const LoginPage = () => {
    const location = useLocation();
    const isLogin = location.pathname === "/login";
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const headerText = isLogin ? "Увійдіть" : "Cтворіть аккаунт";
    const buttonText = isLogin ? "Увійти" : "Зареєструватись";


    const [
        loginToAccount
    ] = useLoginToAccountMutation();

    const [
        register
    ] = useRegisterMutation();



    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username')?.toString() ?? "",
            password: formData.get('password')?.toString() ?? "",
        };

        const res = await loginToAccount(userData);
        if(!res.error){
            form.reset();
            dispatch(setUserLoggedIn(true));
            dispatch(setUser(res.data.user));
            localStorage.setItem('token', res.data['access_token']);
            navigate('/');
        }

    }
    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        e.preventDefault();
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username')?.toString() ?? "",
            password: formData.get('password')?.toString() ?? "",
            role: formData.get('role') as Role,
        };

        const res = await register(userData);
        if(!res.error){
            form.reset();
            navigate('/');
        }
        console.log(res);


    }

    return (
        <>
            <Header/>

            <div
                className={'w-full'}
            >
                <div className={'m-auto w-3/12 py-10'}>
                    <h3 className={'font-bold text-center text-black text-xl mb-10'}>
                        {headerText}
                    </h3>
                    <form onSubmit={(e) =>
                        isLogin ? handleLoginSubmit(e) : handleRegisterSubmit(e)}>
                        <CustomInput name='username' type={""} labelText={"Eлектронна адреса:"}/>
                        <CustomInput name='password' type={"password"} labelText={"Пароль:"}/>

                        {!isLogin &&
                            <select
                                name='role'
                                className={'px-2 py-2 rounded w-full border border-solid border-black text-black bg-white text-lg mt-3'}
                            >
                                {Object.values(Role).map(role => (
                                    <option key={role}>{role}</option>
                                ))}
                            </select>
                        }
                        <CustomButton buttonText={buttonText}></CustomButton>

                    </form>

                </div>

            </div>
        </>
    )
}