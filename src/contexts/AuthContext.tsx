import React, {useState, createContext, ReactNode, useEffect} from "react";
import { api} from "../services/api"; 

import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateToken } from "../services/validToken";



type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loading: boolean;
    loadingAuth: boolean;
    haveIpAddress: boolean;
    signOut: () => Promise<void>;
    addIpAddress: (ipAdress: IPAddressProps) => Promise<void>;
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

type IPAddressProps = {
    ip: string;
}

export const AuthContext = createContext({} as AuthContextData)


export function AuhtProvider({children}: AuhtProviderProps){
    const [user, setUser] = useState<UserProps>({
        token: ''
    });
    const [ip, setIp] = useState<IPAddressProps>({
        ip: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function getUser(){
            const userInfo = await AsyncStorage.getItem('@openroad');
            const ipAddressInfo = await AsyncStorage.getItem('@IpAddress');
            let hasUser: UserProps = JSON.parse(userInfo || '{}');
            let hasIp: IPAddressProps = JSON.parse(ipAddressInfo || '{}');
            
            if(Object.keys(hasIp).length > 0){
                api.defaults.baseURL = `http://${hasIp}`
                setIp(hasIp);
            }
            if(Object.keys(hasUser).length > 0){
                if(validateToken(hasUser.token)){
                    api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
                    setUser({token: hasUser.token})
                    setLoading(false);
                    return;
                }
                signOut()
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
            setIp({ip: ''})
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

    async function addIpAddress({ip}: IPAddressProps){

        await AsyncStorage.setItem('@IpAddress', JSON.stringify(ip))

        api.defaults.baseURL = `http://${ip}`

        setIp({ip})
    }



    const isAuthenticated = !!user.token;
    const haveIpAddress = !!ip.ip;

    return(
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut,
                haveIpAddress,
                addIpAddress
                }}>
            {children}
        </AuthContext.Provider>
    )
}