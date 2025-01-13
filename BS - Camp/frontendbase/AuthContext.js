import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [authUser, setAuthUser] = useState(
        AsyncStorage.getItem('authToken') || null,
    );

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async() => {
            const token = await AsyncStorage.getItem('authToken');
            setLoading(false);

            const decodedToken = jwtDecode(token);
            setToken(token);
            const userId = decodedToken.userId;
            setUserId(userId);
            console.log("Userid bro", userId);
            console.log("Authuser bro:", authUser);
            console.log("Token", token);
        };
        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{token, setToken, userId, setUserId, authUser, setAuthUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};