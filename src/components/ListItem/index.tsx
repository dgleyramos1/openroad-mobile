import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

interface ItemsProps{
    data: {
        id: string;
        amount: number | string;
        price: number;
        status: boolean;
        draft: boolean;
    }
}

export function ListItem({data}: ItemsProps){
    return(
        <View style={styles.container}>
            <Text>Item da list</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {}
})