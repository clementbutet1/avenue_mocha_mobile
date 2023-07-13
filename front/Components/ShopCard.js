import React, { useState, useEffect } from 'react';
import { View, Image, Platform, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Styles from '../Styles/StylesPrincipal';
import { DisplayGoodImage } from './DisplayGoodShop';
const { width } = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;

const ShopCard = ({ navigation, element, index }) => {
    const [picture, setPicture] = useState('../Assets/' + element.photo);

    return (
        <View style={styles.card} key={index}>
           {DisplayGoodImage(picture, element)}
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                    {element.label}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {element.desc}
                </Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Boutique", {element})}}
                        style={[styles.signIn, { borderColor: '#462e01', borderWidth: 1 }]}>
                        <Text style={[styles.textSign, { color: '#462e01' }]}>Voir la boutique</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
    },
    cardImage: {
        flex: 3,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        color: '#444',
    },
    button: {
        alignItems: 'center',
        marginTop: 5,
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});


export default ShopCard;