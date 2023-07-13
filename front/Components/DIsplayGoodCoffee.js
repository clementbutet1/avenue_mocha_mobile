import React  from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window');const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
import url from '../config/env';

export const DisplayGoodCoffee = (picture, element) => {
    if (picture) {
        if (element.photo == "cafecreme.jpg") {
            return (
                <Image source={require('../Assets/cafecreme.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "cafeexpresso.jpg") {
            return (
                <Image source={require('../Assets/cafeexpresso.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "cafelong.jpg") {
            return (
                <Image source={require('../Assets/cafelong.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "capuccino.jpg") {
            return (
                <Image source={require('../Assets/capuccino.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        else {
            let img = `${url.ENV_URL}` + '/uploads/images/' + element.photo;
            return (
                <Image source={{ uri: img || null }} style={styles.cardImage} resizeMode="cover" />
            )
        }
    } else {
        return (
            <Image source={require('../Assets/cafeexpresso.jpg' )} style={styles.cardImage} resizeMode="cover" />
        )
    }
}

const styles = StyleSheet.create({
    cardImage: {
        flex: 3,
        width: '100%',
        height: '100%',
        borderRadius: 5,
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