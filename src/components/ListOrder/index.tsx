import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

interface OrderProps{
    data: {
        id: string;
        table: number | string;
        status: boolean;
        total: number;
    }
}

export function ListOrder({data}: OrderProps){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    function handleOrder(){
        navigation.navigate('Order', {number: data.table, order_id: data.id})
    }
    return(
        <TouchableOpacity style={styles.container} onPress={handleOrder}>
            <Text style={styles.table}>Mesa {data.table}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101026',
        marginBottom: 4,
        height: 40
    },
    table: {
        color: '#fff'
    }
})