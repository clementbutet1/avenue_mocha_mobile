import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Styles from '../Styles/StylesPrincipal';
import Police from '../Styles/StylePolice';
import LoadingScreen from '../Components/LoadingScreen';
import { DisplayGoodCoffee } from '../Components/DIsplayGoodCoffee';
import { Switch } from 'native-base';
import { SizeTab, QuantityTab } from '../Utils/SettingsCoffee';
import { CreateShopList, getActiveShop } from '../API/GetShopList';
import { AddCoffeCommand } from '../API/GetCoffee';
import ReactNativePickerModule from "react-native-picker-module";

export default function CoffeeScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [warm, setWarm] = useState(false);
    const [size, setSize] = useState(false);
    const [quantity, setQuanity] = useState(false);
    const [glass, setGlass] = useState(false);
    const [sugar, setSugar] = useState(false);
    const [cream, setCream] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const pickerRefSize = useRef();
    const pickerRefQuantity = useRef();
    const pickerRefGlass = useRef();
    const pickerRefSugar = useRef();
    const pickerRefCream = useRef();

    useEffect(() => {
        if (route) {
            if (route.params) {
                setIsLoading(false);
            }
        }
    }, [navigation]);


    const checkToSend = async () => {
        console.log(size, quantity, glass);
        setErrorMessage('');
        if (!size || !quantity || !glass || !sugar || !cream)
            setErrorMessage("Un champs est manquant");
        let res = await CreateShopList();
        if (res == 201)
            res = await getActiveShop();
        else if (res === 205)
            return;
        let res_coffee = await AddCoffeCommand(res._id, route.params.element._id, quantity, warm, size, glass, cream, sugar);
        if (res_coffee === 201)
            navigation.goBack();

    }

    if (!isLoading) {
        return (
            <SafeAreaView style={Styles.container}>
                <View style={{ height: 200 }}>
                    {DisplayGoodCoffee(route.params.element.photo, route.params.element)}
                </View>
                <ScrollView>
                    <View style={{ paddingTop: '5%' }}>
                        <Text style={[Police.titre, { paddingLeft: '5%', paddingBottom: '2%', textTransform: 'capitalize', fontWeight: '400' }]}>{route.params.element.titre}</Text>
                    </View>
                    <View style={{ marginTop: '1%' }}>
                        <View
                            style={[Styles.case, { height: 'auto', paddingBottom: '5%' }]}>
                            <Text style={[Police.mediumtitre, { marginLeft: '5%', fontWeight: 'bold' }]}>Description</Text>
                            <Text style={{ marginTop: '2.5%', marginLeft: '5%', fontStyle: 'italic', fontSize: 13 }}>{route.params.element.description}</Text>
                        </View>
                        <View style={[Styles.case, { height: 'auto', paddingBottom: '5%', paddingLeft: '5%' }]}>
                            <Text style={[Police.mediumtitre, { fontWeight: 'bold' }]}>Ingrédients</Text>
                            <Text style={{ paddingTop: '2.5%' }}>{route.params.element.ingredients}</Text>
                        </View>
                        <View style={[Styles.case, { height: 'auto', paddingBottom: '5%', paddingLeft: '5%' }]}>
                            <Text style={[Police.mediumtitre, { fontWeight: 'bold' }]}>Autres</Text>
                            <Text style={{ paddingTop: '2.5%' }}>Nutrition : {route.params.element.nutrition}</Text>
                            <Text style={{ paddingTop: '2.5%' }}>Calories : {route.params.element.calorie} cal</Text>
                            <Text style={{ paddingTop: '2.5%' }}>Protéine : {route.params.element.proteine} g</Text>
                            <Text style={{ paddingTop: '2.5%' }}>Caféine : {route.params.element.cafeine} mg</Text>
                            <Text style={{ paddingTop: '2.5%' }}>Prix : {route.params.element.price} €</Text>
                        </View>
                        <View style={[{ height: 'auto', paddingTop: '5%', paddingLeft: '5%' }]}>
                            <Text style={[Police.mediumtitre, { fontWeight: 'bold' }]}>Configuration Café</Text>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Café Chaud: </Text>
                                <Switch value={warm} onChange={() => setWarm(!warm)} />
                            </View>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Taille du gobelet : </Text>
                                <View>
                                    <TouchableOpacity onPress={() => pickerRefSize.current.show()}>
                                        {(size == "") ? <Text style={{ color: 'grey' }}>Taille</Text> : <Text style={{color: 'black'}}>{size}</Text>}
                                    </TouchableOpacity>
                                    <ReactNativePickerModule
                                        pickerRef={pickerRefSize}
                                        value={size}
                                        title={"Taille"}
                                        items={[{ label: 'Petit', value: 'Petit' }, { label: 'Moyen', value: 'Moyen' }, { label: 'Grand', value: 'Grand' }]}
                                        onCancel={() => { console.log("Cancelled") }}
                                        onValueChange={value => { setSize(value) }}
                                    />
                                </View>
                            </View>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Quantité : </Text>
                                <View>
                                    {/* <RNPickerSelect
                                        onValueChange={(value) => setQuanity(value)}
                                        value={quantity}
                                        placeholder={{ value: "Quantité", label: "Quantité" }}
                                        items={[{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' },  { label: '5', value: '5' },{ label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' }, ]}
                                    /> */}
                                    <TouchableOpacity onPress={() => pickerRefQuantity.current.show()}>
                                        {(quantity == "") ? <Text style={{ color: 'grey' }}>Quantité</Text> : <Text style={{color: 'black'}}>{quantity}</Text>}
                                    </TouchableOpacity>
                                    <ReactNativePickerModule
                                        pickerRef={pickerRefQuantity}
                                        value={quantity}
                                        title={"Quantité"}
                                        items={[{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5', value: '5' }, { label: '6', value: '6' }, { label: '7', value: '7' }, { label: '8', value: '8' }, { label: '8', value: '8' }, { label: '9', value: '9' }, { label: '10', value: '10' },]}
                                        onCancel={() => { console.log("Cancelled") }}
                                        onValueChange={value => { setQuanity(value) }}
                                    />
                                </View>
                            </View>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Nombres de glacons : </Text>
                                <View>
                                    {/* <RNPickerSelect
                                        onValueChange={(value) => setGlass(value)}
                                        value={glass}
                                        placeholder={{ value: "Glaçons", label: "Glaçons" }}
                                        items={[{ label: 'Sans Glaçons', value: 'Sans Glaçons' }, { label: 'Moins de glaçons', value: 'Moins de glaçons' }, { label: 'Extra glaçons', value: 'Extra glaçons' }]}
                                    /> */}
                                    <TouchableOpacity onPress={() => pickerRefGlass.current.show()}>
                                        {(glass == "") ? <Text style={{ color: 'grey' }}>Glaçons</Text> : <Text style={{color: 'black'}}>{glass}</Text>}
                                    </TouchableOpacity>
                                    <ReactNativePickerModule
                                        pickerRef={pickerRefGlass}
                                        value={glass}
                                        title={"Glaçons"}
                                        items={[{ label: 'Sans Glaçons', value: 'Sans Glaçons' }, { label: 'Moins de glaçons', value: 'Moins de glaçons' }, { label: 'Extra glaçons', value: 'Extra glaçons' }]}
                                        onCancel={() => { console.log("Cancelled") }}
                                        onValueChange={value => { setGlass(value) }}
                                    />
                                </View>
                            </View>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Nombres de sucres : </Text>
                                <View>
                                    {/* <RNPickerSelect
                                        onValueChange={(value) => setSugar(value)}
                                        value={sugar}
                                        placeholder={{ value: "Sucres", label: "Sucres" }}
                                        items={[{ label: 'Sans sucres', value: 'Sans sucres' }, { label: 'Ajouté Sucres', value: 'Ajouté Sucres' }, { label: 'Extra sucres', value: 'Extra sucres' }, { label: 'Peu de sucres', value: 'Peu de sucres' }]}
                                    /> */}
                                    <TouchableOpacity onPress={() => pickerRefSugar.current.show()}>
                                        {(sugar == "") ? <Text style={{ color: 'grey' }}>Sucres</Text> : <Text style={{color: 'black'}}>{sugar}</Text>}
                                    </TouchableOpacity>
                                    <ReactNativePickerModule
                                        pickerRef={pickerRefSugar}
                                        value={sugar}
                                        title={"Sucres"}
                                        items={[{ label: 'Sans sucres', value: 'Sans sucres' }, { label: 'Ajouté Sucres', value: 'Ajouté Sucres' }, { label: 'Extra sucres', value: 'Extra sucres' }, { label: 'Peu de sucres', value: 'Peu de sucres' }]}
                                        onCancel={() => { console.log("Cancelled") }}
                                        onValueChange={value => { setSugar(value) }}
                                    />
                                </View>
                            </View>
                            <View style={[Styles.center, { flexDirection: 'row', justifyContent: 'space-between', height: 50, marginRight: '5%' }]}>
                                <Text style={{ paddingTop: '2.5%', paddingBottom: 7.5 }}>Quantité de crème : </Text>
                                <View>
                                    {/* <RNPickerSelect
                                        onValueChange={(value) => setCream(value)}
                                        value={cream}
                                        placeholder={{ value: "Crème", label: "Crème" }}
                                        items={[{ label: 'Sans crème', value: 'Sans crème' }, { label: 'Ajouté Crème', value: 'Ajouté Crème' }, { label: 'Extra crème', value: 'Extra crème' }, { label: 'Peu de crème', value: 'Peu de crème' }]}
                                    /> */}
                                    <TouchableOpacity onPress={() => pickerRefCream.current.show()}>
                                        {(cream == "") ? <Text style={{ color: 'grey' }}>Crème</Text> : <Text style={{color: 'black'}}>{cream}</Text>}
                                    </TouchableOpacity>
                                    <ReactNativePickerModule
                                        pickerRef={pickerRefCream}
                                        value={cream}
                                        title={"Crème"}
                                        items={[{ label: 'Sans crème', value: 'Sans crème' }, { label: 'Ajouté Crème', value: 'Ajouté Crème' }, { label: 'Extra crème', value: 'Extra crème' }, { label: 'Peu de crème', value: 'Peu de crème' }]}
                                        onCancel={() => { console.log("Cancelled") }}
                                        onValueChange={value => { setCream(value) }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[Styles.center, { height: 'auto', marginTop: 15 }]}>
                        {(errorMessage != "") && <Text style={{ color: 'red', fontSize: 17 }}>{errorMessage}</Text>}
                    </View>
                    <View
                        style={{
                            paddingTop: '7.5%',
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}>
                        <TouchableOpacity
                            style={Styles.button}
                            onPress={() => checkToSend()}
                        >
                            <Text style={{ color: 'white' }}>Commander</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return <LoadingScreen />;
    }
}
