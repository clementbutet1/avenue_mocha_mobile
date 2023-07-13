import React  from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window');const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;

export const DisplayGoodImage = (picture, element) => {
    if (picture) {
        if (element.photo == "chambery") {
            return (
                <Image source={require('../Assets/chambery.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "lyon") {
            return (
                <Image source={require('../Assets/lyon.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "bordeaux") {
            return (
                <Image source={require('../Assets/bordeaux.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "chambery") {
            return (
                <Image source={require('../Assets/chambery.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "cannes") {
            return (
                <Image source={require('../Assets/cannes.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "monaco") {
            return (
                <Image source={require('../Assets/monaco.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "grenoble") {
            return (
                <Image source={require('../Assets/grenoble.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "lille") {
            return (
                <Image source={require('../Assets/lille.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        } 
        if (element.photo == "lyon") {
            return (
                <Image source={require('../Assets/lyon.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        if (element.photo == "grenoble") {
            return (
                <Image source={require('../Assets/grenoble.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        if (element.photo == "montpellier") {
            return (
                <Image source={require('../Assets/montpellier.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        if (element.photo == "paris") {
            return (
                <Image source={require('../Assets/paris.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        if (element.photo == "marseille") {
            return (
                <Image source={require('../Assets/marseille.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        if (element.photo == "../Assets/nantes") {
            return (
                <Image source={require('../Assets/nantes.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
        else {
            return (
                <Image source={require('../Assets/nantes.jpg' )} style={styles.cardImage} resizeMode="cover" />
            )
        }
    }
}

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