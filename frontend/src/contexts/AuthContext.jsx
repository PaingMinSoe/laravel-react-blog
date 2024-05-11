import axios from "axios";
import { axiosClient } from "../services/axiosClient";
import { createContext, useContext, useEffect, useReducer } from "react";


const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload.user, token: action.payload.token};
        case 'LOGOUT':
            return {...state, user: null, token: null};
        case 'INIT':
            return {...state, user: action.payload.user};
        default:
            return state;
    }
}
            
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {user: null, token: localStorage.getItem('ACCESS_TOKEN'), isLoggedIn: false});
    
    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN')) {
            axiosClient.get('/user')
            .then(response => {
                const user = response.data;
                dispatch({type: 'INIT', payload: { user }});
            });
        }
    }, []);

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

    const logout = async () => {
        await axiosClient.post('/logout');
        localStorage.removeItem('ACCESS_TOKEN');
        dispatch({type: 'LOGOUT'});
    }

    const register = async ({name, email, password, password_confirmation}) => {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");

        const response = await axios.post("http://localhost:8000/api/register", {
            name,
            email,
            password,
            password_confirmation
        });
        const {user, token} = response.data;
        localStorage.setItem('ACCESS_TOKEN', token);

        dispatch({type: 'LOGIN', payload: {user, token}});
    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout, register }} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);