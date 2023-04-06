import React, {useState, useContext} from 'react';
import {View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';


export default function SignIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {signIn} = useContext(AuthContext);

    async function handleLogin(){
        if(username === '' || password === ''){
            return
        }

        await signIn({username, password});
    }


    return(
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
                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    placeholderTextColor="#f0f0f0"
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    input: {
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: '#fff'
    },
    button: {
        width: '95%',
        height: 40,
        backgroundColor: '#3fffa3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#101026'
    }
});