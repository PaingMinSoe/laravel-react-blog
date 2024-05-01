import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";


const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload.user, token: action.payload.token};
        case 'LOGOUT':
            return {...state, user: null, token: null};
        default:
            return state;
    }
}
            
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {user: null, token: null});

    const login = async ({email, password}) => {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            withCredentials: true,
            withXSRFToken: true,
        });

        const response = await axios.post("http://localhost:8000/api/login", {email, password});
            
        const {user, token} = response.data;
        localStorage.setItem('ACCESS_TOKEN', token);

        dispatch({type: 'LOGIN', payload: {user, token}});
    }

    const logout = () => {
        dispatch({type: 'LOGOUT'});
    }

    const register = ({username, email, password, password_confirmation}) => {
        console.log('REGISTER');
    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register }} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);