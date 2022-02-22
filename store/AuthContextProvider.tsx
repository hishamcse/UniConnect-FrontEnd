import React, {useCallback, useEffect, useState} from "react";
import AuthContext, {AuthContextObj} from "./auth-context";
import {LoginData} from "../models/LoginData";

let logoutTimer: ReturnType<typeof setTimeout>;

let initLoginData: LoginData = {
    personInfo: {personId: -1},
    studentRoles: [],
    teacherRoles: [],
    managementRoles: []
};

const calculateRemainingTime = (expirationTime: string | null) => {
    if (expirationTime === null) return -1;
    const nowTime = new Date().getTime();
    const expiredTime = new Date(expirationTime).getTime();
    return expiredTime - nowTime;
}

const getStoredTokenTimeAndData = () => {
    if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem('token');
        const storedExpirationTime = localStorage.getItem('expirationTime');
        const loggedAs = localStorage.getItem('loggedInAs');
        const loggedOrder = localStorage.getItem('order');
        const storedData = localStorage.getItem('logindata');

        const remainingTime = calculateRemainingTime(storedExpirationTime);

        if (remainingTime <= 3600000) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            localStorage.removeItem('loggedInAs');
            localStorage.removeItem('order');
            localStorage.removeItem('logindata');
            return null;
        }

        return {
            token: storedToken,
            expirationTime: remainingTime,
            loggedAs, loggedOrder,
            // @ts-ignore
            storedData: JSON.parse(storedData)
        }
    }
}

const AuthContextProvider: React.FC = (props) => {

    const storedData = getStoredTokenTimeAndData();
    let initToken;
    let initLoggedAs = '';
    let initLoggedOrder = '';
    if (storedData) {
        initToken = storedData.token;
        // @ts-ignore
        initLoggedAs = storedData.loggedAs;
        // @ts-ignore
        initLoggedOrder = storedData.loggedOrder;
        initLoginData = storedData.storedData;
    }

    const [token, setToken] = useState(initToken);
    const [loginData, setLoginData] = useState(initLoginData);
    const [loggedInAs, setLoggedInAs] = useState(initLoggedAs);
    const [loggedOrder, setLoggedOrder] = useState(initLoggedOrder);

    const isLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setLoginData(initLoginData);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime')
        localStorage.removeItem('loggedInAs');
        localStorage.removeItem('order');
        localStorage.removeItem('logindata');

        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, []);

    const loginHandler = (token: string, expirationTime: string, data: LoginData) => {
        if (typeof window !== "undefined") {
            setToken(token);
            setLoginData(data);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('logindata', JSON.stringify(data));

            const remainingTime = calculateRemainingTime(expirationTime);

            logoutTimer = setTimeout(logoutHandler, remainingTime);
        }
    }

    const loggedInModeHandler = (mode: string) => {
        setLoggedInAs(mode);
        localStorage.setItem('loggedInAs', mode);
    }

    const loggedInOrderHandler = (order: string) => {
        setLoggedOrder(order);
        localStorage.setItem('order', order);
    }

    useEffect(() => {
        if (storedData) {
            logoutTimer = setTimeout(logoutHandler, storedData.expirationTime);
        }
    }, [storedData, logoutHandler])

    const val: AuthContextObj = {
        token, isLoggedIn, login: loginHandler, loginData, loggedInAs, loggedOrder,
        setLoggedInAs: loggedInModeHandler, setLoggedInOrder: loggedInOrderHandler ,logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={val}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;