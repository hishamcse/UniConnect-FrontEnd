import React from "react";
import {LoginData} from "../models/LoginData";

export type AuthContextObj = {
    token: string | null | undefined;
    isLoggedIn: boolean;
    login: (token: string, expirationTime: string, data: LoginData) => void;
    loginData: LoginData;
    loggedInAs: string;
    loggedOrder: string;
    setLoggedInAs: (mode: string) => void;
    setLoggedInOrder: (order: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    token: '',
    isLoggedIn: false,
    login: (token: string) => {
    },
    loginData: {
        personInfo: {personId: -1},
        studentRoles: [],
        teacherRoles: [],
        managementRoles: []
    },
    loggedInAs: '',
    loggedOrder: '',
    setLoggedInAs: () => {
    },
    setLoggedInOrder: () => {
    },
    logout: () => {
    }
});

export default AuthContext;