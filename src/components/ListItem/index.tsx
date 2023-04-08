import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Feather, MaterialIcons } from '@expo/vector-icons'
import { api } from '../../services/api';

interface ItemsProps{
    data: {
        id: string;
        amount: number | string;
        price: number;
        status: boolean;
        draft: boolean;
        product: {
            id: string;
            name: string;
            description: string;
        }
    };
    deleteItem: (item_id: string) => void;
    sendKicthen: (item_id: string) => void;
    deliveredItem: (item_id: string) => void;
}

type ItemRequestProps ={
    id: string;
    amount: number | string;
    price: number;
    status: boolean;
    draft: boolean;
    product: {
        id: string;
        name: string;
        description: string;
    }
}


export function ListItem({data, deleteItem, sendKicthen, deliveredItem}: ItemsProps){
    const [item, setItem] = useState<ItemRequestProps>();

    function handleDeleteItem(){
        deleteItem(data.id)
    }
    function handleKitchenItem(){
        sendKicthen(data.id)
    }

    function handleDeliveredItem(){
        deliveredItem(data.id)
    }

    useEffect(() => {
        async function loadItem() {
            const response = await api.get(`/items/item/${data.id}`)
    
            setItem(response.data)
        }
        loadItem()

    }, [])

    return(
        <View style={styles.container}>
            <View style={[styles.content, {width: !data.status ? '55%' : '100%'}]}>
                <Text style={styles.item}>{item?.amount} - {item?.product.name}</Text>
                <Text style={styles.item}>{item?.price} reais</Text>
            </View>

            {data.draft && (
                <View style={styles.actions}>
                    {data.draft && (
                        <TouchableOpacity
                            onPress={handleDeleteItem}
                        >
                            <Feather 
                                name='trash-2'
                                color="#ff3f4b"
                                size={25}
                            />
                        </TouchableOpacity>
                    )}

                    {data.draft && (
                        <TouchableOpacity
                            onPress={handleKitchenItem}
                        >
                            <Feather 
                                name='book-open'
                                color="#fff"
                                size={25}
                            />
                        </TouchableOpacity>
                    )}

                    {data.draft && (
                        <TouchableOpacity
                            onPress={handleDeliveredItem }
                        >
                            <MaterialIcons 
                                name='delivery-dining'
                                color="#3fff2e"
                                size={25}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101026',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#8a8a8a'
    },
    content: {
        width: '55%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'flex-start'
    },
    item: {
        color: '#fff'
    },
    actions: {
        width: '40%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
})