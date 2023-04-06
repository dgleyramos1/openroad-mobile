import React, {useContext, useState} from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";



export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === '') return 

        const response = await api.post('/orders/create', {
            table: Number(number)
        })

        navigation.navigate('Order', {number: number, order_id: response.data.id });
        
        setNumber('');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Mesas</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número da mesa"
                    placeholderTextColor="#f0f0f0"
                    keyboardType="numeric"
                    value={number}
                    onChangeText={setNumber}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={openOrder}    
                >
                    <Text style={styles.buttonText}>Abrir mesa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    content:{
        width: '90%'
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    input: {
        width: '100%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#fff'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})