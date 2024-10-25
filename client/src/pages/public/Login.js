import React, { useState, useCallback, useEffect } from 'react';
import { Button, InputField, Loading } from 'components';
import { apiForgotPassword, apiLogin, apiRegister } from 'apis';
import Swal from 'sweetalert2';
import path from 'utils/path';
import { useNavigate } from 'react-router-dom';
import { login } from 'store/user/userSlice';
import { useDispatch } from 'react-redux';
import { validate } from 'utils/helper';
import { showModal } from 'store/app/appSlice';

const Login = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: '',
    });
    const [invalidFields, setInvalidFields] = useState([]);
    const [emailForgotPassword, setEmailForgotPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [isShowModelForgot, setIsShowModelForgot] = useState(false);
    const handleForgotPassword = useCallback(async () => {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiForgotPassword({ email: emailForgotPassword });
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
            Swal.fire('Congratulation', response.mes, 'success').then(() => {
                setIsShowModelForgot(false);
            });
        } else {
            Swal.fire('Oops!', response.mes, 'error');
        }
    }, []);
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: '',
        });
    };
    useEffect(() => {
        resetPayload();
    }, [isRegister]);

    const handleOnClick = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
        if (invalids === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
                const response = await apiRegister(payload);
                console.log(response);
                dispatch(showModal({ isShowModal: false, modalChildren: null }));
                if (response.success) {
                    Swal.fire('Congratulation', response.mes, 'success').then(() => {
                        setIsRegister(false);
                    });
                } else {
                    Swal.fire('Oops!', response.mes, 'error');
                }
            } else {
                const response = await apiLogin(data);
                if (response?.success) {
                    dispatch(login({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
                    Navigate(`/${path.HOME}`);
                } else {
                    Swal.fire('Oops!', 'Error', 'error');
                }
            }
        }
    }, [payload, isRegister]);
    return (
        <div className="w-screen h-screen relative">
            {isShowModelForgot && (
                <div className="absolute top-0 left-0 animate-slide-right bottom-0 right-0 bg-white flex justify-center py-8 z-50">
                    <div className="flex flex-col gap-4">
                        <label htmlFor="email">Enter your email:</label>
                        <input
                            type="text"
                            id="email"
                            className="pb-2 border-b outline-none placeholder:text-sa"
                            placeholder="Exp: email@gmail.com"
                            value={emailForgotPassword}
                            onChange={(e) => setEmailForgotPassword(e.target.value)}
                        />
                        <div className="w-[800px] pb-2 outline-none placeholder:text-sm flex justify-around">
                            <Button name={'Submit'} handleOnClick={handleForgotPassword} />
                            <Button
                                name={'Back'}
                                handleOnClick={() => {
                                    setIsShowModelForgot(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <img
                src="https://images.pexels.com/photos/358532/pexels-photo-358532.jpeg?cs=srgb&dl=pexels-pixabay-358532.jpg&fm=jpg"
                alt=""
                className="w-full h-full object-cover"
            />
            <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
                <div className="p-8 bg-white rounded-md min-w-[500px]">
                    <h1 className="text-[28px] font-semibold text-main flex flex-col items-center">Login</h1>
                    {isRegister && (
                        <InputField
                            nameKey="firstname"
                            value={payload.firstname}
                            setValue={setPayload}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    {isRegister && (
                        <InputField
                            nameKey="lastname"
                            value={payload.lastname}
                            setValue={setPayload}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    {isRegister && (
                        <InputField
                            nameKey="mobile"
                            value={payload.mobile}
                            setValue={setPayload}
                            setInvalidFields={setInvalidFields}
                        />
                    )}
                    <InputField
                        nameKey="email"
                        value={payload.email}
                        setValue={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <InputField
                        nameKey="password"
                        value={payload.password}
                        setValue={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Button children={isRegister ? 'Register' : 'Login'} handleOnClick={handleOnClick} fw />
                    <div className="flex justify-between ">
                        {!isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => {
                                    setIsShowModelForgot(true);
                                }}
                            >
                                Forgot your password
                            </span>
                        )}
                        {!isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer"
                                onClick={() => {
                                    setIsRegister(true);
                                }}
                            >
                                Create new account
                            </span>
                        )}
                        {isRegister && (
                            <span
                                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                                onClick={() => {
                                    setIsRegister(false);
                                }}
                            >
                                Go login
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
