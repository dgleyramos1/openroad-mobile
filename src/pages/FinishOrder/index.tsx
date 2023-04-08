import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {Feather} from '@expo/vector-icons';


export function FinishOrder(){
    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja fecha essa mesa?</Text>
            <Text style={styles.title}>Mesa 50</Text>

            <TouchableOpacity style={styles.button}>
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