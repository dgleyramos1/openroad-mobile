import React, {useState, createContext, ReactNode, useEffect} from "react";
import { api} from "../services/api"; 

import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loading: boolean;
    loadingAuth: boolean;
    signOut: () => Promise<void>;
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
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        async function getUser(){
            const userInfo = await AsyncStorage.getItem('@openroad');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');
            if(Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                setUser({token: hasUser.token})
            }
            setLoading(false);
        }

        getUser()
    }, [])


    async function signIn({username, password}: SignInProps){
        setLoadingAuth(true);

        try{
            const response = await api.post('/login', {
                username,
                password
            });

            const token: string = response.data.replace("{token: ", "").replace("}", "");

            const data = {token: token}

            await AsyncStorage.setItem('@openroad', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            setUser({token});

            setLoadingAuth(false);
        }catch(err){
            console.log("Erro ao acessar", err)
            setLoadingAuth(false);
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
                .then(() => {
                    setUser({
                        token: ''
                    })
                })
    }

    const isAuthenticated = !!user.token;
    return(
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut
                }}>
            {children}
        </AuthContext.Provider>
    )
}