import React, {useEffect, useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { OrderProps } from '../Dashboard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';



type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

export type ProductsProps ={
    id: string;
    name: string;
}
export type ItemProps = {
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

type OrderRouterProp = RouteProp<RouteDetailParams, 'Order'>;


export default function Order(){
    const route = useRoute<OrderRouterProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const [order, setOrder] = useState<OrderProps | undefined>();
    const [ category, setCategory ] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();

    const [amount, setAmount] = useState('1');
    const [observation, setObservation] = useState('');
    const [items, setItems] =useState<ItemProps[] | []>([]);

    const [products, setProducts] = useState<ProductsProps[] | []>([]);
    const [productSeleted, setProductSelected] = useState<ProductsProps | undefined>()

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalProductVisible, setModalProductVisible] = useState(false);

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/categories');

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get(`/products/category/${categorySelected?.id}`)
            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts();
    }, [categorySelected])

    useEffect(() => {
        loadOrder()
    }, [])

    async function loadOrder(){
        const response = await api.get(`/orders/${route.params?.order_id}`)
        setOrder(response.data)
        setItems(response.data?.items)
    }
    
    async function handleCloseOrder(){
        try{
            await api.delete(`/orders/${route.params?.order_id}`)

            navigation.goBack();
        }catch(err){
            console.log(err)
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductsProps){
        setProductSelected(item)
    }

    async function handleAdd(){
        const response = await api.post(`/items/create/${order?.id}/${productSeleted?.id}`,{
            amount: Number(amount),
            observation: observation
        })

        let data ={
            id: response.data.id,
            amount: response.data.amount,
            price: response.data.price,
            status: response.data.status,
            draft: response.data.draft,
            product: {
                id: response.data.product.id as string,
                name: response.data.product.name as string,
                description: response.data.product.description as string
            }
        }
        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete(`/items/${item_id}`)

        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })

        setItems(removeItem)
    }

    async function handleSendKitchen(item_id: string){
        const response = await api.put(`/items/kitchen/${item_id}`)
        loadOrder();
    }

    function handleGoBack(){
        navigation.navigate('Dashboard');
    }



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack}>
                <Feather name='arrow-left' size={28} color="#3fffa3"/>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {order?.table}</Text>
                {items.length === 0 && (
                    <TouchableOpacity
                    onPress={handleCloseOrder}
                    >
                        <Feather name='trash-2' size={28} color="#ff3f4b"/>
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 &&
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            }

            {products.length !== 0 &&
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {productSeleted?.name}
                    </Text>
                </TouchableOpacity>
            }


            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, {width: '60%', textAlign: 'center'}]}
                    placeholderTextColor="#f0f0f0"
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>
            
            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, {height: 60, fontSize: 16, alignItems: 'baseline', width: '75%'}]}
                    placeholder='Observações'
                    placeholderTextColor="#f0f0f0"
                    value={observation}
                    onChangeText={setObservation}
                />
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem} sendKicthen={handleSendKitchen}/>}
            />

            <View style={styles.contentTotal}>
                <Text style={styles.value}>Total: {order?.total} reais</Text>
                <TouchableOpacity
                    style={[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                    disabled={items.length === 0}    
                >
                    <Text style={styles.buttonText}>Fechar mesa</Text>
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 22
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 5
    },
    buttonAdd: {
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        height: 40,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    value: {
        width: "40%",
        fontSize: 20,
        color: '#ff3f4b'
    }
})