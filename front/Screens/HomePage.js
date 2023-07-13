import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import { Icon } from 'native-base';
import LoadingScreen from '../Components/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import Styles from '../Styles/StylesPrincipal';
import { getCoffeeAll } from '../API/GetCoffee';
import { CoffeeShop } from '../Utils/dataShop';
import ShopCard from '../Components/ShopCard';
import { Coffeebase } from '../Utils/CoffeBase';
import { DisplayGoodCoffee } from '../Components/DIsplayGoodCoffee';
import ActionButton from 'react-native-action-button';
import { GetShopWithCoffee } from '../API/GetShopList';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const HomePage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [picture, setPicture] = useState('');
  const shop = CoffeeShop;
  const Coffees = Coffeebase;
  const [allCoffees, setAllCoffees] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lenghtShop, setLenghtShop] = useState(0);

  const getAllCoffee = async () => {
    let res = await getCoffeeAll();
    setAllCoffees(res);
    let res_size = await GetShopWithCoffee();
    setLenghtShop(0);
    if (res_size != 200) {
      setLenghtShop(res_size.length);
    }
    setIsLoading(false);
  };

  const onRefresh = async () => {
    getAllCoffee().then(() => setRefreshing(false));
  };

  useEffect(() => {
    if (refreshing) {
      onRefresh();
    }
  }, [refreshing]);

  useEffect(() => {
    getAllCoffee();
  }, [navigation, isFocused]);

  const coffeelist = () => {
    return allCoffees.map((element, index) => {
      return (
        <TouchableOpacity style={{ padding: '2%' }} key={index} onPress={() => navigation.navigate('Café', { element })}>
          <View key={element.key} style={[Styles.center, { borderColor: 'black', borderWidth: 1, height: 150, width: 150, borderRadius: 10, padding: 5, borderColor: '#462e01' }]}>
            {DisplayGoodCoffee(element.photo, element)}
            <Text style={{ color: '#462e01', paddingTop: 5 }}>{element.titre}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

  if (!isLoading) {
    return (
      <View style={Styles.container}>
        <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: '#462e01' }}>Les boutiques : </Text>
        <View style={{ height: '35%' }}>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center" style={styles.scrollView}>
            {shop.map((element, index) => {
              return (
                <View key={index}>
                  <ShopCard navigation={navigation} element={element} index={index} />
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: 'black', paddingVertical: 5 }} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }>
          <View style={{ height: '65%' }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-around',
              }}>
              {coffeelist()}
            </View>
          </View>
        </ScrollView>
        <View style={[Styles.center, { position: 'absolute', bottom: 0, alignSelf: 'flex-end', paddingBottom: "10%", paddingRight: "10%" }]} >
          <TouchableOpacity style={[Styles.center, { backgroundColor: '#462e01', width: 65, height: 65, borderRadius: 65 }]} onPress={() => navigation.navigate('MonPanier')}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon
                type="AntDesign"
                name="shoppingcart"
                style={{
                  color: 'white',
                  fontSize: 30,
                  paddingLeft: 2,
                  paddingBottom: 1,
                }}
              />
              <Text style={{ fontSize: 17, paddingLeft: '10%', paddingTop: '7.5%', color: 'white' }}>{lenghtShop}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (<LoadingScreen />)
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
});


export default HomePage;