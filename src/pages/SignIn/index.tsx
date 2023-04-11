import React, {useState, useContext} from 'react';
import {View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import {Ionicons} from '@expo/vector-icons'


export default function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [eye, setEye] = useState(true)

    const {signIn, loadingAuth, addIpAddress, haveIpAddress} = useContext(AuthContext);

    async function handleLogin(){
        if(username === '' || password === ''){
            return
        }

        await signIn({username, password});
    }

    async function handleIp(){
        if(ip === '' || port === '') return

        const ipAdress = `${ip}:${port}`

        await addIpAddress({ip : ipAdress});
    }

    function handleEyePassword(){
        setEye(!eye);
    }


    return(
        
        <>
            {haveIpAddress ? (
                <View style={styles.container}>
                    <Text style={styles.logo}>OpenRoad</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            placeholder='Digite seu usuário'
                            style={styles.input}
                            placeholderTextColor="#f0f0f0"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <View style={styles.inputArea}>
                            <TextInput 
                                placeholder='Digite sua senha'
                                style={[styles.input, {width: '85%', marginBottom: 0}]}
                                placeholderTextColor="#f0f0f0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={eye}
                            />
                            <TouchableOpacity style={styles.icon} onPress={handleEyePassword}>
                                <Ionicons name='eye' color="#fff" size={25}/>
                            </TouchableOpacity>
                        </View>
        
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            {loadingAuth ? (
                                <ActivityIndicator size={25} color="#fff"/>
                            ): (
                                <Text style={styles.buttonText}>Acessar</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                <Text style={styles.title}>Coloque o endereço IP da aplicação desktop!</Text>
                <View style={[styles.inputContainer, {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}]}>
                    <TextInput 
                        placeholder='IP'
                        style={[styles.input, {width: '65%'}]}
                        placeholderTextColor="#f0f0f0"
                        value={ip}
                        onChangeText={setIp}
                    />
                    <TextInput 
                        placeholder='Port'
                        style={[styles.input, {width: '30%'}]}
                        placeholderTextColor="#f0f0f0"
                        value={port}
                        onChangeText={setPort}
                    />
    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleIp}
                    >
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )
        }
        </>
    )
    
}

const styles = StyleSheet.create({  
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d1d2e'
    },
    logo:{
        marginBottom: 18,
        color: '#fff',
        fontSize: 64
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    inputArea: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#101026',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        marginBottom: 12,
        height: 40
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#fff'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3fffa3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    },
    title: {
        color: '#fff',
        fontSize: 16
    },
    icon: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});