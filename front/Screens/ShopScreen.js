import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import Styles from '../Styles/StylesPrincipal';
import Police from '../Styles/StylePolice';
import LoadingScreen from '../Components/LoadingScreen';
import { DisplayGoodImage } from '../Components/DisplayGoodShop';

export default function ShopScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (route) {
            if (route.params) {
                setIsLoading(false);
            }
        }
    }, [navigation]);

    if (!isLoading) {
        return (
            <SafeAreaView style={Styles.container}>
                <View style={{height: 300}}>
                    {DisplayGoodImage(route.params.element.photo, route.params.element)}
                </View>
                <View style={{ paddingTop: '5%' }}>
                    <Text style={[Police.titre, { paddingLeft: '5%', paddingBottom: '5%', textTransform: 'capitalize', fontWeight: '400' }]}>{route.params.element.label}</Text>
                    <Text style={[Police.text, { paddingLeft: '5%', paddingBottom: '2%', fontSize: 14 }]}>{route.params.element.adress}</Text>
                </View>
                <View style={{ marginTop: '3%' }}>
                    <View
                        style={[Styles.case, { height: 'auto', paddingBottom: '5%' }]}>
                        <Text style={[Police.mediumtitre, { marginLeft: '5%', fontWeight: 'bold' }]}>Description</Text>
                        <Text style={{ marginTop: '5%', marginLeft: '5%', fontStyle: 'italic', fontSize: 13 }}>{route.params.element.desc}</Text>
                    </View>
                    <View style={[Styles.case, { height: 'auto', paddingBottom: '5%', paddingLeft: '5%' }]}>
                        <Text style={[Police.mediumtitre, { fontWeight: 'bold' }]}>Ouverture</Text>
                        <Text style={{ paddingTop: '5%' }}>{route.params.element.horaire}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    } else {
        return <LoadingScreen />;
    }
}
