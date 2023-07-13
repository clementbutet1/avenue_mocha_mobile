import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Icon } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import Styles from '../Styles/StylesPrincipal';
import LoadingScreen from '../Components/LoadingScreen';
import { GetShopWithCoffee, updateShop } from '../API/GetShopList';
import { DisplayGoodCoffee } from '../Components/DIsplayGoodCoffee';
import { RemoveCoffeCommand } from '../API/GetCoffee';

const ShopListScreen = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();
    const [price, setPrice] = useState(0);

    const onRefresh = async () => {
        getShopList().then(() => setRefreshing(false));
    };

    useEffect(() => {
        if (refreshing) {
            onRefresh();
        }
    }, [refreshing]);


    const getShopList = async () => {
        let res_size = await GetShopWithCoffee();
        if (res_size != 200)
            await setData(res_size);
        let total = 0;
        if (res_size) {
            if (res_size.lenght != 0) {
                res_size.forEach(element => {
                    total += parseInt(element.coffeeId.price) * parseInt(element.quantity);
                });
            } else {
                total += parseInt(res_size.coffeeId.price) * parseInt(res_size.quantity);
            }
            setPrice(total);
        }
        setIsLoading(false);
    }

    const deleteCoffee = async (id) => {
        let res_size = await RemoveCoffeCommand(id);
        if (res_size == 201) {
            getShopList();
        }
        setIsLoading(false);
    }

    const payeCoffe = async () => {
        let res_size = await updateShop(data[0].commandId._id, price);
        if (res_size == 200) {
            navigation.goBack();
        }
    }

    const getTotalPrice = () => {
       
    }

    useEffect(() => {
        getShopList();
    }, [navigation]);

    useEffect(() => {
        setIsLoading(true);
        getShopList();
    }, [isFocused]);



    const renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    borderBottomColor: '#c0c6ea',
                    borderBottomWidth: 0.5,
                    paddingBottom: '2.5%',
                    paddingTop: '2.5%',
                    paddingLeft: '5%',
                    flexDirection: 'row',
                }}>
                <View style={{ width: "30%", marginRight: "2.5%" }}>
                    {DisplayGoodCoffee(item.photos)}
                </View>

                <View style={{ width: '60%' }}>
                    <Text style={{ color: 'rgba(123,124,124,255)' }}>
                        {item.coffeeId.titre}
                    </Text>
                    <Text style={{ color: 'rgba(123,124,124,255)' }}>
                        Quantité: {item.quantity}
                    </Text>
                    <Text style={{ color: 'rgba(123,124,124,255)', fontStyle: 'italic' }}>
                        Chaud: {item.warm ? "oui" : "non"}
                    </Text>
                    <Text style={{ color: 'rgba(123,124,124,255)' }}>
                        Sucres: {item.sugar}
                    </Text>
                    <Text style={{ color: 'rgba(123,124,124,255)' }}>
                        Glaçons: {item.glass}
                    </Text>
                    <Text style={{ color: 'rgba(123,124,124,255)', textTransform: 'capitalize' }}>
                        Crème: {item.cream}
                    </Text>
                </View>
                <TouchableOpacity style={[Styles.center, { width: '10%', paddingRight: '5%' }]} onPress={() => deleteCoffee(item._id)}>
                    <Icon type="MaterialIcons" name="delete-outline" style={[Styles.iconprofil, { color: 'red' }]} />
                </TouchableOpacity>
            </View>
        );
    };

    if (!isLoading) {
        return (
            <SafeAreaView style={Styles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => setRefreshing(true)}
                            />
                        }
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        extraData={selectedId}
                        ListHeaderComponent={() =>
                            data == '' ? (
                                <View style={[Styles.center]}>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: 'rgba(123,124,124,255)',
                                            marginTop: '10%',
                                        }}>
                                        Pas de café
                                    </Text>
                                </View>
                            ) : null
                        }
                    />
                </View>
                <View style={{ paddingTop: '7.5%', alignContent: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <TouchableOpacity style={Styles.button} onPress={() => payeCoffe()} >
                        <Text style={{ color: 'white' }}>Payer {price} €</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    } else {
        return <LoadingScreen />;
    }
};

export default ShopListScreen;
