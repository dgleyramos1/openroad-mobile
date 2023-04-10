import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    FlatList
} from "react-native";
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { ListOrder } from "../../components/ListOrder";




export type OrderProps = {
    id: string;
    table: number | string;
    status: boolean;
    total: number;
}

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [table, setTable] = useState('');
    const [orders, setOrders] = useState<OrderProps[] | []>([]);

    


    loadOrders()
    async function loadOrders(){
        const response = await api.get('/orders')
        setOrders(response.data)
    }

    async function openOrder(){
        if(table === '') return 

        const response = await api.post('/orders/create', {
            table: Number(table)
        })
        
        navigation.navigate('Order', {number: table, order_id: response.data.id});
        
        setTable('');
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
                    value={table}
                    onChangeText={setTable}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={openOrder}    
                >
                    <Text style={styles.buttonText}>Abrir mesa</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24, width: '90%'}}
                data={orders}
                keyExtractor={(order) => order.id}
                renderItem={({item}) => <ListOrder data={item}/>}
            />
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