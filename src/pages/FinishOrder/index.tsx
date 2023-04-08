import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {Feather} from '@expo/vector-icons';

import {useNavigation, useRoute, RouteProp} from '@react-navigation/native'
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";


type RouteDetailParams = {
    FinishOrder: {
        table: number | string;
        order_id: string;
        price: number
    }
}

type FinishORderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export function FinishOrder(){

    const route = useRoute<FinishORderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinish(){
        try{
            await api.put(`/orders/finish/${route.params?.order_id}`)
            navigation.popToTop();
        }catch(err){
            console.log("ERRO AO FINALIZAR, tente mais tarde");
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja fechar essa mesa?</Text>
            <Text style={styles.title}>
                Mesa {route.params?.table}
            </Text>

            <Text style={styles.alert}>
                Total a pagar: {route.params?.price} reais
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleFinish}    
            >
                <Text style={styles.buttonText}>Fechar Mesa</Text>
                <Feather 
                    name="shopping-cart"
                    size={20}
                    color="#1d1d2e"
                />
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingHorizontal: '4%',
        paddingVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    buttonText: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})