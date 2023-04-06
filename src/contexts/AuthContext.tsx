import React, {useState, createContext, ReactNode} from "react";
import { api } from "../servers/api"; 

import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    token: string;
}

type AuhtProviderProps = {
    children: ReactNode
}

type SignInProps = {
    username: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)


export function AuhtProvider({children}: AuhtProviderProps){
    const [user, setUser] = useState<UserProps>({
        token: ''
    });
    const [loadingAuth, setLoadingAuth] = useState(false);

    async function signIn({username, password}: SignInProps){
        setLoadingAuth(true);

        try{
            const response = await api.post('/login', {
                username,
                password
            })
            const token: string = response.data.replace("{token: ", "").replace("}", "");

            const data = response.data;

            await AsyncStorage.setItem('@openroad', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            setUser({token});

            setLoadingAuth(false);
        }catch(err){
            console.log("Erro ao acessar", err)
            setLoadingAuth(false);
        }
    }


    const isAuthenticated = !!user.token;
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}