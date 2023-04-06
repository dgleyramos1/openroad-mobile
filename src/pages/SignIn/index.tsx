import React, {useState} from 'react';
import {View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';


export default function SignIn(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function handleLogin(){
        if(email === '' || pass === ''){
            return
        }

        setEmail("");
        setPass("");
    }


    return(
        <View style={styles.container}>
            <Text style={styles.logo}>OpenRoad</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder='Digite seu e-mail'
                    style={styles.input}
                    placeholderTextColor="#f0f0f0"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    placeholder='Digite sua senha'
                    style={styles.input}
                    placeholderTextColor="#f0f0f0"
                    value={pass}
                    onChangeText={setPass}
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